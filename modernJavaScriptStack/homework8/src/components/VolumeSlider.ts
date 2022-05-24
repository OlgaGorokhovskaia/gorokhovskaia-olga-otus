const icons = require('@Icons');

interface IVolumeSlider {
    parent?: HTMLElement;
};

export class VolumeSlider implements IVolumeSlider {
    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent || document.body;

        this.init();
    };

    init(): void {
        //  volume slider
        const volumeSlider: HTMLInputElement = document.createElement('input');
        volumeSlider.className = 'volume-slider';
        volumeSlider.setAttribute('type', 'range');
        volumeSlider.setAttribute('max', '1');
        volumeSlider.setAttribute('value', '1');
        volumeSlider.setAttribute('step', '0.1');

        //  volume
        const volumeBtn: HTMLSpanElement = document.createElement('span');
        volumeBtn.className = 'fas fa-volume-up';
        volumeBtn.setAttribute('style', `background-image: url(${icons.volumeIcon});`);

        volumeSlider.addEventListener('change', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            const iconUrl = this.getIcon(e.target as HTMLInputElement);
            volumeBtn.setAttribute('style', `background-image: url(${iconUrl});`);
        });

        volumeSlider.addEventListener('input', () => {
            const music: HTMLMediaElement | null = document.querySelector('#audio-source');
            if (music) music.volume = Number(volumeSlider.value);
        });

        volumeBtn.addEventListener('click', () => {
            this.toggleActiveClass(volumeBtn);
            this.toggleActiveClass(volumeSlider);
        });

        this.parent.appendChild(volumeSlider);
        this.parent.appendChild(volumeBtn);
    };

    getIcon = (elem: HTMLInputElement): string => elem.value === '0' ? icons.muteIcon : icons.volumeIcon;

    toggleActiveClass = (elem: HTMLElement): void => { elem.classList.toggle('active'); };
};