import { ISong } from '../data';

interface IAudio {
    song: ISong;
    parent?: HTMLElement;
};

export class Audio implements IAudio {
    song: ISong;
    parent?: HTMLElement;
    
    constructor(song: ISong, parent?: HTMLElement) {
        this.song = song;
        this.parent = parent || document.body;

        this.init();
    }

    init(): void {
        const audio: HTMLAudioElement = document.createElement('audio');
        audio.id = 'audio-source';
        audio.src = this.song.path || '';

        this.parent.appendChild(audio);
    };
};