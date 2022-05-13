export class PlaylistCard {
    constructor(parent, song) {
        this.parent = parent || document.body;
        this.song = song || {};

        this.init();
    };

    init() {
        const playlistCard = document.createElement('div');
        playlistCard.className = "playlist-card";

        const img = document.createElement('img');
        img.className = "playlist-card-img";
        img.src = this.song.cover || '';
        playlistCard.appendChild(img);

        const p = document.createElement('p');
        p.className = "playlist-card-name";
        p.textContent = this.song.artist || '';
        playlistCard.appendChild(p);

        this.parent.appendChild(playlistCard);
    };
};