import * as icons from '@Icons';
import { Queque } from './Queue';

export class Playlist {
    constructor(parent, songs) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init() {
        const playlist = document.createElement('section');
        playlist.className = "playlist";

        this.createBackBtn(playlist);
        this.createTitle(playlist);

        for (let i = 0; i < this.songs.length; i++) {
            new Queque(playlist, this.songs, i);
        };

        this.parent.appendChild(playlist);
    };

    createBackBtn = (parent) => {
        const backButton = document.createElement('img');
        backButton.src = icons.backIcon;
        backButton.className = "back-btn icon";

        backButton.addEventListener('click', () => {
            parent.classList.remove('active');
        });

        parent.appendChild(backButton);
    };

    createTitle = (parent) => {
        const title = document.createElement('h1');
        title.className = "title";
        title.textContent = "playlist";
        parent.appendChild(title);
    };
};