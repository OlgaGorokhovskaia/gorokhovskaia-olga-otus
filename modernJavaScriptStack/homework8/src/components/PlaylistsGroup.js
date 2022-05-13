import { PlaylistCard } from './PlaylistCard';

export class PlaylistsGroup {
    constructor(parent, songs, title) {
        this.parent = parent || document.body;
        this.songs = songs || [];
        this.title = title || '';

        this.init();
    };

    init() {
        this.createHeading();
        this.createPlaylistGroup();
    };

    createHeading = () => {
        const heading = document.createElement('h1');
        heading.className = "heading";
        heading.textContent = this.title;

        this.parent.appendChild(heading);
    };

    createPlaylistGroup = () => {
        const playlistGroup = document.createElement('div');
        playlistGroup.className = "playlists-group";

        const lastSongIndex = this.songs.length - 1;
        const numberOfSongs = 2;
        const minIndex = lastSongIndex - numberOfSongs;

        for (let i = lastSongIndex; i > minIndex; i--) {
            new PlaylistCard(playlistGroup, this.songs[i]);
        }

        this.parent.appendChild(playlistGroup);
    };
};