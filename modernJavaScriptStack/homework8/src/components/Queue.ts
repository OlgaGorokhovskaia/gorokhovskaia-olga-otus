import { setMusic } from '../setMusic';
import { ISong } from '../data';

const icons = require('@Icons');

interface IQueque {
    songs: ISong[];
    index: number;
    parent?: HTMLElement;
};

export class Queque implements IQueque {
    songs: ISong[];
    index: number;
    parent?: HTMLElement;
    
    constructor(songs: ISong[], index: number, parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];
        this.index = index;

        this.init();
    };

    init(): void {
        const queue: HTMLDivElement = document.createElement('div');
        queue.className = 'queue';

        this.createCover(queue);
        this.createSongName(queue);

        queue.addEventListener('click', () => { this.chouseQueque(queue) });

        this.parent.appendChild(queue);
    };

    createCover = (parent: HTMLElement): void => {
        const queueCover: HTMLDivElement = document.createElement('div');
        queueCover.className = 'queue-cover';

        const cover : HTMLImageElement = document.createElement('img');
        cover.src = this.songs[this.index].cover;
        queueCover.appendChild(cover);

        const iconBtn: HTMLElement = document.createElement('i');
        iconBtn.className = `fas fa-play`;
        iconBtn.setAttribute('style', `background-image: url(${icons.playIcon});`);
        queueCover.appendChild(iconBtn);

        parent.appendChild(queueCover);
    };

    createSongName = (parent: HTMLElement): void => {
        const songName = document.createElement('p');
        songName.className = 'name';
        songName.textContent = `${this.songs[this.index].name}`;

        parent.appendChild(songName);
    };

    chouseQueque = (queue: HTMLElement): void => {
        const icon: HTMLElement = queue.getElementsByTagName('i')[0];
        const isActive: boolean = queue.classList.contains('active');
        const isPlay: boolean = icon.classList.contains('fa-pause');

        if (isPlay && isActive) {
            icon.className = 'fas fa-play';
            icon.setAttribute('style', `background-image: url(${icons.playIcon});`);
            const pauseBtn: HTMLElement = document.querySelector('i.fa-pause');
            pauseBtn.click();
        } else {
            icon.className = 'fas fa-pause';
            icon.setAttribute('style', `background-image: url(${icons.pauseIcon});`);

            setMusic(this.index, this.songs);

            const playBtn: HTMLElement = document.querySelector('i.fa-play');
            playBtn.click();
        }
    };
};