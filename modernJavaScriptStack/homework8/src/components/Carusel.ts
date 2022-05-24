import { ISong } from '../data';

interface ICarusel {
    songs: ISong[];
    parent?: HTMLElement;
};  

export class Carusel implements ICarusel {
    songs: ISong[];
    parent: HTMLElement;

    constructor(songs: ISong[], parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init() {
        const carousel: HTMLDivElement = document.createElement('div');
        carousel.className = 'carousel';

        for (let i = 0; i < this.songs.length; i++) {
            const img: HTMLImageElement = document.createElement('img');
            img.src = this.songs[i].cover;

            carousel.appendChild(img);
        };

        this.setActiveImage(carousel);

        this.parent.appendChild(carousel);
    };

    setActiveImage = (carousel: HTMLDivElement): void => {
        const carouselImage: NodeListOf<HTMLImageElement> = carousel.querySelectorAll('.carousel img');

        let carouselImageIndex = 0;
        carouselImage[carouselImageIndex].className = 'active';

        setInterval(() => {
            this.changeCarousel(carouselImage, carouselImageIndex);
        }, 3000);
    };

    changeCarousel = (carouselImage: NodeListOf<HTMLImageElement>, carouselImageIndex: number): void => {
        carouselImage[carouselImageIndex].classList.toggle('active');

        if (carouselImageIndex >= carouselImage.length - 1) {
            carouselImageIndex = 0;
        } else {
            carouselImageIndex++;
        }

        carouselImage[carouselImageIndex].classList.toggle('active');
    };
};