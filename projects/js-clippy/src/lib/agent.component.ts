import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {Queue} from './queue';
import { Animator } from './animator';
import { Loader } from './loader';
import { BalloonComponent } from './balloon.component';
import { AnimationStates } from './animationstates';
  
@Component({
  selector: 'app-clippy',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent implements OnInit {
    @ViewChild(BalloonComponent) balloon;
    @Input() name: string;
    
    public backgroundPosition: string;
    public visible = false;
    public queue: Queue;
    public animator: Animator;
    public loader: Loader;
    public agentClass: string;
    ngOnInit(): void {
        this.agentClass = this.name;  
        this.loader = new Loader();
        const agent = this.loader.loadAgent(this.name);
        const sounds = this.loader.loadSounds(this.name);
        Promise.all([agent, sounds]).then((result) => {
            this.animator = new Animator();
            this.animator.initializeData(result[0], result[1]);
            this.queue = new Queue();
            this.queue.createCallback(this.onQueueEmpty.bind(this));
        
            const subscription = this.animator.backgroundState
                .subscribe(item => this.backgroundPosition = item.backgroundPos);
            });
    }    
    public show (fast): void {
        this.visible = true;
        if (fast) {
            this.resume();
            this.onQueueEmpty();
        }
        this.resume();
        this.play('Show');
    }
    public hide (fast, callback) {
        this.stop();
        if (fast) {
            this.stop();
            this.pause();
            if (callback) {
                callback();
            }
        }

        return this.animator.showAnimation('Hide', () => {
            this.pause();
            this.visible = false;
            if (callback) {
                callback();
            }
        });
    }
    public speak (text, hold): void {
        this.queue.enqueue((complete) => {
            if (this.balloon) {
                this.balloon.speak(complete, text, hold);
            }
            complete();
        });
    }
    public stop (): void {
        // clear the queue
        this.queue.clear();
        this.animator.exitAnimation();
        if (this.balloon) {
            this.balloon.hide();
        }
    }
    public hideBalloon(fast: boolean): void{
        this.balloon.hide(fast);
    }
    animate () {
        const animations = this.animations();
        const anim = animations[Math.floor(Math.random() * animations.length)];
        // skip idle animations
        if (anim.indexOf('Idle') === 0) {
            return this.animate();
        }
        return this.play(anim);
    }

    onQueueEmpty () {
        const idleAnim = this.getIdleAnimation();
        this.animator.showAnimation(idleAnim, (name, state) => {
            if (state === AnimationStates.State.EXITED) {
                this.onQueueEmpty();
            }
        });
    }

    getIdleAnimation () {
        const animations = this.animations();
        const r = [];
        for (let i = 0; i < animations.length; i++) {
            const a = animations[i];
            if (a.indexOf('Idle') === 0) {
                r.push(a);
            }
        }
        // pick one
        const idx = Math.floor(Math.random() * r.length);
        return r[idx];
    }
    
    play (animation) {
        if (!this.hasAnimation(animation)) {
            return false;
        }
        const timeout = 5000;
        this.queue.enqueue((complete) => {
            let completed = false;

            window.setTimeout(() => {
                if (completed) {
                    return;
                }
                // exit after timeout
                this.animator.exitAnimation();
            }, timeout);
            this.animator.showAnimation(animation, (name, state) => {
                if (state === AnimationStates.State.EXITED) {
                    completed = true;
                    complete();
                }
            });
        });
    }
    hasAnimation (name) {
        return this.animator.hasAnimation(name);
    }

    /***
     * Gets a list of animation names
     */
    animations () {
        return this.animator.animations();
    }
    pause () {
        this.animator.clearTimeout();
        if (this.balloon) {
            this.balloon.pause();
        }
    }
    resume () {
        this.animator.step();
        if (this.balloon) {
            this.balloon.resume();
        }
    }
    onDoubleClick () {
        if (!this.play('ClickedOn')) {
            this.animate();
        }
    }
}
