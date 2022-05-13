import { songs } from './src/data';
import { Audio, Carusel, PlaylistsGroup, MusicPlayer, Playlist } from './src/components';
import { setMusic } from './src/setMusic';
import style from './src/style.css';

function init() {
    // add title of the page
    const title = document.head.getElementsByTagName('title')[0];
    title.innerText = 'Music Player';

    // add a favicon
    const link = document.createElement('link');
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute("type", "image/png/ico");
    link.setAttribute("href", "./favicon.ico");
    document.head.appendChild(link);

    const firstAudioIndex = 0;

    new Audio(document.body, songs[firstAudioIndex]);

    const section = document.createElement('section');
    section.className = "home-section";

    new Carusel(section, songs);
    new PlaylistsGroup(section, songs, "based on your listening");
    new MusicPlayer(section, songs, songs[firstAudioIndex]);
    new Playlist(section, songs);

    document.body.appendChild(section);

    // funtion for setting up music
    setMusic(firstAudioIndex, songs);
};

init();