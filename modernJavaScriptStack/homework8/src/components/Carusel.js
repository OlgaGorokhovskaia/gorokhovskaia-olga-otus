export class Carusel {
    constructor(parent, songs) {
        this.parent = parent || document.body;
        this.songs = songs || [];

        this.init();
    };

    init() {
        const carousel = document.createElement('div');
        carousel.className = "carousel";

        for (let i = 0; i < this.songs.length; i++) {
            const img = document.createElement('img');
            img.src = this.songs[i].cover;

            carousel.appendChild(img);
        }

        this.setActiveImage(carousel);

        this.parent.appendChild(carousel);
    };

    setActiveImage = (carousel) => {
        const carouselImage = [...carousel.querySelectorAll('.carousel img')];

        let carouselImageIndex = 0;
        carouselImage[carouselImageIndex].className = 'active';

        setInterval(() => {
            this.changeCarousel(carouselImage, carouselImageIndex);
        }, 3000);
    };

    changeCarousel = (carouselImage, carouselImageIndex) => {
        carouselImage[carouselImageIndex].classList.toggle('active');

        if (carouselImageIndex >= carouselImage.length - 1) {
            carouselImageIndex = 0;
        } else {
            carouselImageIndex++;
        }

        carouselImage[carouselImageIndex].classList.toggle('active');
    };
};