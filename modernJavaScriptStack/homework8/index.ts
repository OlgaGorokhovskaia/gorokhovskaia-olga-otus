import { songs } from './src/data';
import { Audio, Carusel, PlaylistsGroup, MusicPlayer, Playlist } from './src/components';
import { setMusic } from './src/setMusic';

const style = require('./src/style.css');

function init(): void {
    // add title of the page
    const title = document.head.getElementsByTagName('title')[0];
    title.innerText = 'Music Player';

    // add a favicon
    const faviconLink = document.createElement('link');
    faviconLink.setAttribute("rel", "shortcut icon");
    faviconLink.setAttribute("type", "image/png/ico");
    faviconLink.setAttribute("href", "./favicon.ico");
    document.head.appendChild(faviconLink);
    
    const link = document.createElement('link');
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute("type", "image/png/ico");
    link.setAttribute("href", "./favicon.ico");
    

    const firstAudioIndex = 0;
    const song = songs[firstAudioIndex];

    new Audio(song);

    const section = document.createElement('section');
    section.className = "home-section";

    new Carusel(songs, section);
    new PlaylistsGroup(songs, "based on your listening", section);
    new MusicPlayer(songs, song, section);
    new Playlist(songs, section);

    document.body.appendChild(section);

    // funtion for setting up music
    setMusic(firstAudioIndex, songs);
};

init();