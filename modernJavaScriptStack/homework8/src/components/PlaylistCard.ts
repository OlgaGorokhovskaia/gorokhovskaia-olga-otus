
import { ISong } from '../data';

interface IPlaylistCard {
    song: ISong;
    parent?: HTMLElement;
};

export class PlaylistCard implements IPlaylistCard {
    song: ISong;
    parent: HTMLElement;
    
    constructor(song: ISong, parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.song = song;

        this.init();
    };

    init(): void {
        const playlistCard: HTMLDivElement = document.createElement('div');
        playlistCard.className = 'playlist-card';

        const img: HTMLImageElement = document.createElement('img');
        img.className = 'playlist-card-img';
        img.src = this.song.cover || '';
        playlistCard.appendChild(img);

        const p: HTMLParagraphElement = document.createElement('p');
        p.className = 'playlist-card-name';
        p.textContent = this.song.artist || '';
        playlistCard.appendChild(p);

        this.parent.appendChild(playlistCard);
    };
};