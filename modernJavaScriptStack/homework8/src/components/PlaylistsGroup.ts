import { PlaylistCard } from './PlaylistCard';
import { ISong } from '../data';

interface IPlaylistsGroup {
    songs: ISong[];
    title?: string;
    parent?: HTMLElement;
};

export class PlaylistsGroup implements IPlaylistsGroup {
    songs: ISong[];
    title?: string;
    parent?: HTMLElement;
    
    constructor(songs: ISong[], title?: string, parent?: HTMLElement) {
        this.parent = parent || document.body;
        this.songs = songs || [];
        this.title = title || '';

        this.init();
    };

    init(): void {
        this.createHeading();
        this.createPlaylistGroup();
    };

    createHeading = (): void => {
        const heading: HTMLHeadingElement = document.createElement('h1');
        heading.className = 'heading';
        heading.textContent = this.title;

        this.parent.appendChild(heading);
    };

    createPlaylistGroup = (): void => {
        const playlistGroup: HTMLDivElement = document.createElement('div');
        playlistGroup.className = 'playlists-group';

        const lastSongIndex = this.songs.length - 1;
        const numberOfSongs = 2;
        const minIndex = lastSongIndex - numberOfSongs;

        for (let i = lastSongIndex; i > minIndex; i--) {
            new PlaylistCard(this.songs[i], playlistGroup);
        }

        this.parent.appendChild(playlistGroup);
    };
};