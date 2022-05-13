import * as icons from '@Icons';

export class VolumeSlider {
    constructor(parent) {
        this.parent = parent || document.body;

        this.init();
    };

    init() {
        //  volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.className = "volume-slider";
        volumeSlider.setAttribute('type', 'range');
        volumeSlider.setAttribute('max', '1');
        volumeSlider.setAttribute('value', '1');
        volumeSlider.setAttribute('step', '0.1');

        //  volume
        const volumeBtn = document.createElement('span');
        volumeBtn.className = 'fas fa-volume-up';
        volumeBtn.setAttribute('style', `background-image: url(${icons.volumeIcon});`);

        volumeSlider.addEventListener('change', (e) => {
            const iconUrl = e.target.value === '0' ? icons.muteIcon : icons.volumeIcon;
            volumeBtn.setAttribute('style', `background-image: url(${iconUrl});`);
        });

        volumeSlider.addEventListener('input', () => {
            const music = document.querySelector('#audio-source');
            music.volume = volumeSlider.value;
        });

        volumeBtn.addEventListener('click', () => {
            volumeBtn.classList.toggle('active');
            volumeSlider.classList.toggle('active');
        });

        this.parent.appendChild(volumeSlider);
        this.parent.appendChild(volumeBtn);
    };
};