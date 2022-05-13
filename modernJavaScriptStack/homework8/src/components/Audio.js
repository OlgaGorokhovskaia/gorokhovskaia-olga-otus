export class Audio {
    constructor(parent, song) {
        this.parent = parent || document.body;
        this.song = song || {};

        this.init();
    }

    init() {
        const audio = document.createElement('audio');
        audio.id = "audio-source";
        audio.src = this.song.path || '';

        this.parent.appendChild(audio);
    };
};