import { VolumeSlider } from './VolumeSlider';
import { setMusic } from '../setMusic';
import { ControlButton } from './ControlButton';
import { ISong } from '../data';

const icons = require('@Icons');

interface IControls {
    songs: ISong[];
    parent?: HTMLElement;
};

export class Controls implements IControls {
    songs: ISong[];
    parent?: HTMLElement;

    constructor(songs: ISong[], parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init(): void {
        const controls: HTMLDivElement = document.createElement('div');
        controls.className = 'controls';

        this.createRepeatBtn(controls);
        this.createContainerBtn(controls);

        new VolumeSlider(controls);

        this.parent.appendChild(controls);
    };

    toggleActiveClass = (elem: HTMLElement): void => { elem.classList.toggle('active'); };

    createRepeatBtn = (parent: HTMLElement): void => {
        const repeatBtn: HTMLSpanElement = document.createElement('span');
        repeatBtn.className = 'fas fa-redo';
        repeatBtn.setAttribute('style', `background-image: url(${icons.redoIcon});`);

        repeatBtn.addEventListener('click', (e: Event) => { 
            e.preventDefault();
            e.stopPropagation();

            this.toggleActiveClass(e.target as HTMLElement);
        });

        parent.appendChild(repeatBtn);
    };


    backward = (): void => {
        const queue: NodeListOf<Element> = document.querySelectorAll('.queue');
        let currentMusic = 0;

        queue.forEach((item, i) => {
            if (item.classList.contains('active')) {
                currentMusic = i;
            }
        });

        if (currentMusic <= 0) {
            currentMusic = this.songs.length - 1;
        } else {
            currentMusic--;
        }

        setMusic(currentMusic, this.songs);

        const playBtn: HTMLElement = document.querySelector('i.fa-play');

        playBtn.click();
    };

    forward = (): void => {
        const queue: NodeListOf<Element>  = document.querySelectorAll('.queue');
        let currentMusic = 0;

        queue.forEach((item, i) => {
            if (item.classList.contains('active')) {
                currentMusic = i;
            }
        });

        if (currentMusic >= this.songs.length - 1) {
            currentMusic = 0;
        } else {
            currentMusic++;
        }

        setMusic(currentMusic, this.songs);

        const playBtn: HTMLElement = document.querySelector('i.fa-play');
        playBtn.click();
    };

    play = (e: Event): void => {
        this.togglePlay(e, 'fa-pause');
        this.changeIconPlaylist('fa-pause', icons.pauseIcon);
    };

    pause = (e: Event): void => {
        this.togglePlay(e, 'fa-play');
        this.changeIconPlaylist('fa-play', icons.playIcon);
    };

    togglePlay = (e: Event, secondBtnClass: string): void => {
        this.toggleActiveClass(e.target as HTMLElement);

        const secondBtn: HTMLElement = document.querySelector(`i.${secondBtnClass}`);
        this.toggleActiveClass(secondBtn);

        const music: HTMLAudioElement = document.querySelector('#audio-source');

        if (secondBtnClass === 'fa-pause') {
            music.play();
        } else {
            music.pause();
        }
    };

    changeIconPlaylist = (className: string, iconUrl: string): void => {
        const queueIcons: NodeListOf<Element>  = document.querySelectorAll('.queue.active i');

        queueIcons.forEach((icon) => {
            icon.className = `fas ${className}`;
            icon.setAttribute('style', `background-image: url(${iconUrl});`);
        });
    };

    createContainerBtn = (parent: HTMLElement): void => {
        const containerBtn: HTMLDivElement = document.createElement('div');
        containerBtn.className = 'main';

        new ControlButton('fas fa-backward active', icons.backwardIcon, this.backward, containerBtn);
        new ControlButton('fas fa-play active', icons.playIcon, this.play, containerBtn);
        new ControlButton('fas fa-pause', icons.pauseIcon, this.pause, containerBtn);
        new ControlButton('fas fa-forward active', icons.forwardIcon, this.forward, containerBtn);

        parent.appendChild(containerBtn);
    };
};