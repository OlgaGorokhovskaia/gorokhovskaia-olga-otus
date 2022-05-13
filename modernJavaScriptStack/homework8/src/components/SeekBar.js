import { setMusic } from '../setMusic';
import { formatTime } from '../utils';

export class SeekBar {
    constructor(parent, songs) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init() {
        const seekBar = document.createElement('div');
        seekBar.className = "seek-bar-container";

        this.createMusicSeekBar(seekBar);
        this.createTime(seekBar);
        this.createDuration(seekBar);

        this.parent.appendChild(seekBar);
    };

    createMusicSeekBar = (parent) => {
        const musicSeekBar = document.createElement('input');
        musicSeekBar.className = "music-seek-bar";
        musicSeekBar.setAttribute("type", "range");
        musicSeekBar.setAttribute('value', '0');
        musicSeekBar.setAttribute('min', '0');
        musicSeekBar.setAttribute('max', null);

        musicSeekBar.addEventListener('change', (e) => {
            const music = document.querySelector('#audio-source');
            music.currentTime = e.target.value;
        });

        parent.appendChild(musicSeekBar);
    };

    createMusicSeekBar = (parent) => {
        const musicSeekBar = document.createElement('input');
        musicSeekBar.className = "music-seek-bar";
        musicSeekBar.setAttribute("type", "range");
        musicSeekBar.setAttribute('value', '0');
        musicSeekBar.setAttribute('min', '0');
        musicSeekBar.setAttribute('max', null);

        musicSeekBar.addEventListener('change', (e) => {
            const music = document.querySelector('#audio-source');
            music.currentTime = e.target.value;
        });

        parent.appendChild(musicSeekBar);

        setInterval(() => {
            const music = document.querySelector('#audio-source');
            const currentMusicTime = document.querySelector('.current-time');

            musicSeekBar.value = music.currentTime;
            currentMusicTime.innerHTML = formatTime(music.currentTime);

            if (Math.floor(music.currentTime) == Math.floor(musicSeekBar.max)) {
                const repeatBtn = document.querySelector('span.fa-redo');

                if (repeatBtn.classList.contains('active')) {
                    const queue = [...document.querySelectorAll('.queue')];
                    const currentMusic = queue.findIndex(item => item.classList.contains('active')) || 0;

                    setMusic(currentMusic, this.songs);

                    const playBtn = document.querySelector('i.fa-play');
                    playBtn.click();
                } else {
                    const forwardBtn = document.querySelector('i.fa-forward');
                    forwardBtn.click();
                }
            }
        }, 500);
    };

    createTime = (parent) => {
        const time = document.createElement('p');
        time.className = "current-time hide";
        time.textContent = "00 : 00";

        parent.appendChild(time);
    };

    createDuration = (parent) => {
        const duration = document.createElement('p');
        duration.className = "duration hide";
        duration.textContent = "00 : 00";

        parent.appendChild(duration);
    };
};