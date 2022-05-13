import * as icons from '@Icons';
import { VolumeSlider } from './VolumeSlider';
import { setMusic } from '../setMusic';
import { ControlButton } from './ControlButton';

export class Controls {
    constructor(parent, songs) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init() {
        const controls = document.createElement('div');
        controls.className = "controls";

        this.createRepeatBtn(controls);
        this.createContainerBtn(controls);

        new VolumeSlider(controls);

        this.parent.appendChild(controls);
    };

    createRepeatBtn = (parent) => {
        const repeatBtn = document.createElement('span');
        repeatBtn.className = "fas fa-redo";
        repeatBtn.setAttribute('style', `background-image: url(${icons.redoIcon});`);

        repeatBtn.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
        });

        parent.appendChild(repeatBtn);
    };


    backward = () => {
        const queue = [...document.querySelectorAll('.queue')];
        let currentMusic = queue.findIndex(item => item.classList.contains('active')) || 0;

        if (currentMusic <= 0) {
            currentMusic = this.songs.length - 1;
        } else {
            currentMusic--;
        }

        setMusic(currentMusic, this.songs);

        const playBtn = document.querySelector('i.fa-play');
        playBtn.click();
    };

    forward = () => {
        const queue = [...document.querySelectorAll('.queue')];
        let currentMusic = queue.findIndex(item => item.classList.contains('active')) || 0;

        if (currentMusic >= this.songs.length - 1) {
            currentMusic = 0;
        } else {
            currentMusic++;
        }

        setMusic(currentMusic, this.songs);

        const playBtn = document.querySelector('i.fa-play');
        playBtn.click();
    };

    play = (e) => {
        this.togglePlay(e, 'fa-pause');
        this.changeIconPlaylist('fa-pause', icons.pauseIcon);
    };

    pause = (e) => {
        this.togglePlay(e, 'fa-play');
        this.changeIconPlaylist('fa-play', icons.playIcon);
    };

    togglePlay = (e, secondBtnClass) => {
        e.target.classList.remove('active');

        const secondBtn = document.querySelector(`i.${secondBtnClass}`);
        secondBtn.classList.add('active');

        const music = document.querySelector('#audio-source');

        if (secondBtnClass === 'fa-pause') {
            music.play();
        } else {
            music.pause();
        }
    };

    changeIconPlaylist = (className, iconUrl) => {
        const queueIcons = [...document.querySelectorAll('.queue.active i')];

        queueIcons.forEach((icon) => {
            icon.className = `fas ${className}`;
            icon.setAttribute("style", `background-image: url(${iconUrl});`);
        });
    };

    createContainerBtn = (parent) => {
        const containerBtn = document.createElement('div');
        containerBtn.className = "main";

        new ControlButton(containerBtn, "fas fa-backward active", icons.backwardIcon, this.backward);
        new ControlButton(containerBtn, "fas fa-play active", icons.playIcon, this.play);
        new ControlButton(containerBtn, "fas fa-pause", icons.pauseIcon, this.pause);
        new ControlButton(containerBtn, "fas fa-forward active", icons.forwardIcon, this.forward);

        parent.appendChild(containerBtn);
    };
};