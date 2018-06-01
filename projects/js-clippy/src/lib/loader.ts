import { Animator } from './animator';
// @dynamic
export class Loader {
    static importer = {
        url: (url) => {
          return new Promise((resolve, reject) => {
            fetch(url)
                .then(resp => resp.json())
                .then((packageJson) => {
                    resolve(packageJson);
            });
          });
        },
        urls: (urls) => {
          return Promise.all(urls.map(Loader.importer.url));
        }
    };
    static loadSounds (name, path) {
        const audio = document.createElement('audio');
        const canPlayMp3 = !!audio.canPlayType && '' !== audio.canPlayType('audio/mpeg');
        const canPlayOgg = !!audio.canPlayType && '' !== audio.canPlayType('audio/ogg; codecs="vorbis"');

        if (!canPlayMp3 && !canPlayOgg) {
            Promise.resolve({});
        } else {
            const src = path + (canPlayMp3 ? '/sounds-mp3.json' : '/sounds-ogg.json');
            // load
            const dfd = this.importer.url(src);
            return dfd;
        }
    }

    static loadAgent (name, path) {
        const src = path + '/agent.json';
        const dfd = this.importer.url(src);
        return dfd;
    }
    public loadAgent(name: string) {
        const path = 'https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/' + name;
        return new Promise(function(resolve, reject) {
            const agentDfd = Loader.loadAgent(name, path);
            agentDfd.then(function (data) {
                resolve(data);
            });
        });
    }
    public loadSounds(name: string) {
        const path = 'https://raw.githubusercontent.com/Towmeykaw/js-clippy/master/assets/agents/' + name;
        return new Promise(function(resolve, reject) {
            const soundsDfd = Loader.loadSounds(name, path);
            soundsDfd.then(function (sounds) {
                resolve(sounds);
            });
        });
    }
}
