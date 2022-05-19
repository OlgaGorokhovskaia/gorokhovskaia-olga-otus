import { Queque } from './Queue';
import { ISong } from '../data';

const icons = require('@Icons');

interface IPlaylist {
    songs: ISong[];
    parent?: HTMLElement;
};

export class Playlist implements IPlaylist {
    songs: ISong[];
    parent?: HTMLElement;
    
    constructor(songs: ISong[], parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init(): void {
        const playlist: HTMLElement = document.createElement('section');
        playlist.className = 'playlist';

        this.createBackBtn(playlist);
        this.createTitle(playlist);

        for (let i = 0; i < this.songs.length; i++) {
            new Queque(this.songs, i, playlist);
        };

        this.parent.appendChild(playlist);
    };

    createBackBtn = (parent: HTMLElement): void => {
        const backButton: HTMLImageElement = document.createElement('img');
        backButton.src = icons.backIcon;
        backButton.className = 'back-btn icon';

        backButton.addEventListener('click', () => {
            parent.classList.remove('active');
        });

        parent.appendChild(backButton);
    };

    createTitle =  (parent: HTMLElement): void  => {
        const title:HTMLHeadingElement = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'playlist';
        parent.appendChild(title);
    };
};