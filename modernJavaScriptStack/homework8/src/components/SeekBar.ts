import { setMusic } from '../setMusic';
import { formatTime } from '../utils';
import { ISong } from '../data';

interface ISeekBar {
    songs: ISong[];
    parent?: HTMLElement;
};

export class SeekBar implements ISeekBar {
    songs: ISong[];
    parent: HTMLElement;
    
    constructor(songs: ISong[], parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init(): void {
        const seekBar: HTMLDivElement = document.createElement('div');
        seekBar.className = 'seek-bar-container';

        this.createMusicSeekBar(seekBar);
        this.createTime(seekBar);
        this.createDuration(seekBar);

        this.parent.appendChild(seekBar);
    };

    setCurrentTime = (elem: HTMLInputElement): void => {
        const music: HTMLAudioElement | null = document.querySelector('#audio-source');
        if (music) music.currentTime = Number(elem.value);
    };

    createMusicSeekBar = (parent: HTMLElement): void => {
        const musicSeekBar: HTMLInputElement  = document.createElement('input');
        musicSeekBar.className = 'music-seek-bar';
        musicSeekBar.setAttribute('type', 'range');
        musicSeekBar.setAttribute('value', '0');
        musicSeekBar.setAttribute('min', '0');
        musicSeekBar.setAttribute('max', 'null');

        musicSeekBar.addEventListener('change', (e: Event) => {
            this.setCurrentTime(e.target as HTMLInputElement);
        });

        parent.appendChild(musicSeekBar);

        setInterval(() => {
            const music: HTMLAudioElement | null = document.querySelector('#audio-source');
            const currentMusicTime: HTMLInputElement | null = document.querySelector('.current-time');

            musicSeekBar.value = String(music?.currentTime);
            if (currentMusicTime && music) currentMusicTime.innerHTML = formatTime(music.currentTime);

            if (music && Math.floor(music.currentTime) == Math.floor(+musicSeekBar.max)) {
                const repeatBtn: HTMLElement | null  = document.querySelector('span.fa-redo');
                const isActiveRepeatBtn: boolean = !!repeatBtn && repeatBtn.classList.contains('active');

                if (isActiveRepeatBtn) {
                    const queue: NodeListOf<Element> = document.querySelectorAll('.queue');

                    let currentMusic = 0;

                    queue.forEach((item, i) => {
                        if (item.classList.contains('active')) {
                            currentMusic = i;
                        }
                    });

                    setMusic(currentMusic, this.songs);

                    const playBtn: HTMLElement | null = document.querySelector('i.fa-play');
                    if (playBtn) playBtn.click();
                } else {
                    const forwardBtn: HTMLElement | null = document.querySelector('i.fa-forward');
                    if (forwardBtn) forwardBtn.click();
                }
            }
        }, 500);
    };

    createTime = (parent: HTMLElement): void => {
        const time: HTMLParagraphElement = document.createElement('p');
        time.className = 'current-time hide';
        time.textContent = '00 : 00';

        parent.appendChild(time);
    };

    createDuration = (parent: HTMLElement): void => {
        const duration: HTMLParagraphElement = document.createElement('p');
        duration.className = 'duration hide';
        duration.textContent = '00 : 00';

        parent.appendChild(duration);
    };
};