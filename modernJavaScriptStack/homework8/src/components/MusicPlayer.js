import * as icons from '@Icons';
import { Controls } from './Controls';
import { SeekBar } from './SeekBar';

export class MusicPlayer {
    constructor(parent, songs, song) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.song = song || {};

        this.init();
    };

    init() {
        const section = document.createElement('section');
        section.className = "music-player-section";

        section.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            section.classList.add('active');
        });

        this.createBackBtn(section);
        this.createNavBtn(section);
        this.createInformationAboutSong(section);

        new SeekBar(section, this.songs);
        new Controls(section, this.songs);

        this.parent.appendChild(section);
    };

    createBackBtn = (section) => {
        const backIcon = document.createElement('img');
        backIcon.src = icons.backIcon;
        backIcon.className = "back-btn icon hide";

        backIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            section.classList.remove('active');
        });

        section.appendChild(backIcon);
    };

    createNavBtn = (section) => {
        const navIcon = document.createElement('img');
        navIcon.src = icons.navIcon;
        navIcon.className = "nav-btn icon hide";

        navIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const playlistSection = document.querySelector('.playlist');
            playlistSection.classList.add('active');
        });

        section.appendChild(navIcon);
    };

    createInformationAboutSong = (section) => {
        const { name, artist, cover } = this.song;

        const currentSong = document.createElement('h1');
        currentSong.className = "current-song-name";
        currentSong.textContent = name || '';
        section.appendChild(currentSong);

        const currentArtist = document.createElement('p');
        currentArtist.className = "artist-name hide";
        currentArtist.textContent = artist || '';
        section.appendChild(currentArtist);

        const currentCover = document.createElement('img');
        currentCover.className = "cover hide";
        currentCover.src = cover || '';
        section.appendChild(currentCover);
    };
};