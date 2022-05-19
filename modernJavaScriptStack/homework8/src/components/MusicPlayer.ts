import { Controls } from './Controls';
import { SeekBar } from './SeekBar';
import { ISong } from '../data';

const icons = require('@Icons');


interface IMusicPlayer {
    songs: ISong[];
    song: ISong;
    parent?: HTMLElement;
};

export class MusicPlayer implements IMusicPlayer {
    songs: ISong[];
    song: ISong;
    parent: HTMLElement;
    
    constructor(songs: ISong[], song: ISong, parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.song = song;

        this.init();
    };

    init(): void {
        const section: HTMLElement = document.createElement('section');
        section.className = 'music-player-section';

        section.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            section.classList.add('active');
        });

        this.createBackBtn(section);
        this.createNavBtn(section);
        this.createInformationAboutSong(section);

        new SeekBar(this.songs, section);
        new Controls(this.songs, section);

        this.parent.appendChild(section);
    };

    createBackBtn = (section: HTMLElement): void => {
        const backIcon = document.createElement('img');
        backIcon.src = icons.backIcon;
        backIcon.className = 'back-btn icon hide';

        backIcon.addEventListener('click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            section.classList.remove('active');
        });

        section.appendChild(backIcon);
    };

    createNavBtn = (section: HTMLElement): void => {
        const navIcon = document.createElement('img');
        navIcon.src = icons.navIcon;
        navIcon.className = 'nav-btn icon hide';

        navIcon.addEventListener('click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            const playlistSection: HTMLElement | null = document.querySelector('.playlist');
            playlistSection?.classList.add('active');
        });

        section.appendChild(navIcon);
    };

    createInformationAboutSong = (section: HTMLElement): void  => {
        const { name, artist, cover } = this.song;

        const currentSong: HTMLHeadingElement = document.createElement('h1');
        currentSong.className = 'current-song-name';
        currentSong.textContent = name || '';
        section.appendChild(currentSong);

        const currentArtist: HTMLParagraphElement = document.createElement('p');
        currentArtist.className = 'artist-name hide';
        currentArtist.textContent = artist || '';
        section.appendChild(currentArtist);

        const currentCover: HTMLImageElement = document.createElement('img');
        currentCover.className = 'cover hide';
        currentCover.src = cover || '';
        section.appendChild(currentCover);
    };
};