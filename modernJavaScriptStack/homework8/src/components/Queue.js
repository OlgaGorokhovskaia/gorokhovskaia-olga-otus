import * as icons from '@Icons';
import { setMusic } from '../setMusic';

export class Queque {
    constructor(parent, songs, index) {
        this.parent = parent || document.body;
        this.songs = songs || [];
        this.index = index;

        this.init();
    };

    init() {
        const queue = document.createElement('div');
        queue.className = "queue";

        this.createCover(queue);
        this.createSongName(queue);

        queue.addEventListener('click', (e) => { this.chouseQueque(queue) });

        this.parent.appendChild(queue);
    };

    createCover = (parent) => {
        const queueCover = document.createElement('div');
        queueCover.className = "queue-cover";

        const cover = document.createElement('img');
        cover.src = this.songs[this.index].cover;
        queueCover.appendChild(cover);

        const iconBtn = document.createElement('i');
        iconBtn.className = `fas fa-play`;
        iconBtn.setAttribute("style", `background-image: url(${icons.playIcon});`);
        queueCover.appendChild(iconBtn);

        parent.appendChild(queueCover);
    };

    createSongName = (parent) => {
        const songName = document.createElement('p');
        songName.className = "name";
        songName.textContent = `${this.songs[this.index].name}`;

        parent.appendChild(songName);
    };

    chouseQueque = (queue) => {
        const isActive = queue.classList.contains('active');
        const icon = queue.getElementsByTagName('i')[0];
        const isPlay = icon.classList.contains('fa-pause');

        if (isPlay && isActive) {
            icon.className = "fas fa-play";
            icon.setAttribute("style", `background-image: url(${icons.playIcon});`);
            const pauseBtn = document.querySelector('i.fa-pause');
            pauseBtn.click();
        } else {
            icon.className = "fas fa-pause";
            icon.setAttribute("style", `background-image: url(${icons.pauseIcon});`);

            setMusic(this.index, this.songs);

            const playBtn = document.querySelector('i.fa-play');
            playBtn.click();
        }
    };
};