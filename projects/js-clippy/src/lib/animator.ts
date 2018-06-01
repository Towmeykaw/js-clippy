import {BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs';
import { AgentComponent } from './agent.component';
import { AnimationStates } from './animationstates';

let _started = false;
let _exiting = false;
let _currentAnimation;
let _endCallback: any;
let currentAnimationName: any;
let _loop: any;
let _currentFrame: any;
let _currentFrameIndex: number;
let _sounds: any;
let _data: any;

export class Animator {
    _backgroundPos = '"0px 0px"';
    public backgroundState = new BehaviorSubject({ backgroundPos: '"0px 0px"'});

    changePos(pos) {
        this.backgroundState.next({backgroundPos: pos});
    }

    initializeData(data, sounds) {
        _data = data;
        _sounds = sounds;
        this.preloadSounds(sounds);
    }
    animations () {
        const r = [];
        const d = _data.animations;
        for (const n of Object.keys(d)) {
            r.push(n);
        }
        return r;
    }

    preloadSounds (sounds) {
        for (let i = 0; i < _data.sounds.length; i++) {
            const snd = _data.sounds[i];
            const uri = sounds[snd];
            if (!uri) {
                continue;
            }
            _sounds[snd] = new Audio(uri);
        }
    }

    hasAnimation (name) {
        return !!_data.animations[name];
    }

    exitAnimation () {
        _exiting = true;
    }

    showAnimation (animationName, callback) {
        return new Promise(() => {
            _exiting = false;

            if (!this.hasAnimation(animationName)) {
                return false;
            }
            _currentAnimation = _data.animations[animationName];
            currentAnimationName = animationName;

            _currentFrameIndex = 0;
            _currentFrame = undefined;

            if (!_started) {
                this.step();
                _started = true;
            }
            _endCallback = callback;
            return true;
        });
    }
    getCurrentAnimation() {
        return currentAnimationName;
    }
    draw () {
        let images = [];
        if (_currentFrame) {
            images = _currentFrame.images || [];
        }
        for (let i = 0; i < images.length; i++) {
            const xy = images[i];
            const bg = -xy[0] + 'px ' + -xy[1] + 'px';
            this.changePos(bg);
        }
    }

    getNextAnimationFrame () {
        if (!_currentAnimation) {
            return undefined;
        }
        // No current frame. start animation.
        if (!_currentFrame) {
            return 0;
        }
        const currentFrame = _currentFrame;
        const branching = _currentFrame.branching;

        if (_exiting && currentFrame.exitBranch !== undefined) {
            return currentFrame.exitBranch;
        } else if (branching) {
            let rnd = Math.random() * 100;
            for (let i = 0; i < branching.branches.length; i++) {
                const branch = branching.branches[i];
                if (rnd <= branch.weight) {
                    return branch.frameIndex;
                }
                rnd -= branch.weight;
            }
        }
        return _currentFrameIndex + 1;
    }

    playSound () {
        const s = _currentFrame.sound;
        if (!s) {
            return;
        }
        const audio = _sounds[s];
        if (audio) {
            audio.play();
        }
    }

    atLastFrame () {
        return _currentFrameIndex >= _currentAnimation.frames.length - 1;
    }

    step () {
        if (!_currentAnimation) {
            return;
        }
        const newFrameIndex = Math.min(this.getNextAnimationFrame(), _currentAnimation.frames.length - 1);
        const frameChanged = !_currentFrame || _currentFrameIndex !== newFrameIndex;
        _currentFrameIndex = newFrameIndex;

        // always switch frame data, unless we're at the last frame of an animation with a useExitBranching flag.
        if (!(this.atLastFrame() && _currentAnimation.useExitBranching)) {
            _currentFrame = _currentAnimation.frames[_currentFrameIndex];
        }

        this.draw();
        this.playSound();

        _loop = setTimeout(this.step.bind(this), _currentFrame.duration);

        // fire events if the frames changed and we reached an end
        if (_endCallback && frameChanged && this.atLastFrame()) {
            if (_currentAnimation.useExitBranching && !_exiting) {
                _endCallback(currentAnimationName, AnimationStates.State.WAITING);
            } else {
                _endCallback(currentAnimationName, AnimationStates.State.EXITED);
            }
        }
    }
    clearTimeout() {
        clearTimeout(_loop);
    }
}
