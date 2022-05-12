import style from './src/style.css';

import * as musics from '@Musics';
import * as icons from '@Icons';

import { songs } from './src/data';
import { app } from './src/app';


function component() {
    const link = document.createElement('link');
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute("type", "image/png/ico");
    link.setAttribute("href", "./favicon.ico");
    document.head.appendChild(link);

    const title = document.head.getElementsByTagName('title')[0];
    title.innerText = 'Music Player';


    // add audio
    const audio = document.createElement('audio');
    audio.id = "audio-source";
    audio.src = musics.song1;

    document.body.appendChild(audio);

    // add section

    const section = document.createElement('section');
    section.className = "home-section";


    // add carousel
    const carousel = document.createElement('div');
    carousel.className = "carousel";

    for (let i = 0; i < songs.length; i++) {
        const img = document.createElement('img');
        img.src = songs[i].cover;

        if (i === 0) img.className = "active";

        carousel.appendChild(img);
    }

    section.appendChild(carousel);

    // add heading
    const heading = document.createElement('h1');
    heading.className = "heading";
    heading.textContent = "based on your listening";

    section.appendChild(heading);

    // add playlistGroup
    const playlistGroup = document.createElement('div');
    playlistGroup.className = "playlists-group";

    for (let i = songs.length - 1; i > songs.length - 3; i--) {
        const playlistCard = document.createElement('div');
        playlistCard.className = "playlist-card";

        const img = document.createElement('img');
        img.src = songs[i].cover;
        img.className = "playlist-card-img";
        playlistCard.appendChild(img);

        const p = document.createElement('p');
        p.className = "playlist-card-name";
        p.textContent = songs[i].artist;
        playlistCard.appendChild(p);

        playlistGroup.appendChild(playlistCard);
    }

    section.appendChild(playlistGroup);

    // add music player
    const secondSection = document.createElement('section');
    secondSection.className = "music-player-section active";

    const backIcon = document.createElement('img');
    backIcon.src = icons.backIcon;
    backIcon.className = "back-btn icon hide";
    secondSection.appendChild(backIcon);

    const navIcon = document.createElement('img');
    navIcon.src = icons.navIcon;
    navIcon.className = "nav-btn icon hide";
    secondSection.appendChild(navIcon);


    const currentSong = document.createElement('h1');
    currentSong.className = "current-song-name";
    currentSong.textContent = `${songs[0].name}`;
    secondSection.appendChild(currentSong);

    const currentArtist = document.createElement('p');
    currentArtist.className = "artist-name hide";
    currentArtist.textContent = `${songs[0].artist}`;
    secondSection.appendChild(currentArtist);

    const currentCover = document.createElement('img');
    currentCover.src = `${songs[0].cover}`;
    currentCover.className = "cover hide";
    secondSection.appendChild(currentCover);


    const seekBar = document.createElement('div');
    seekBar.className = "seek-bar-container";
    seekBar.innerHTML = `
                <input type="range" class="music-seek-bar" value="0">
                <p class="current-time hide">00 : 00</p>
                <p class="duration hide">00 : 00</p>
            `;
    secondSection.appendChild(seekBar);



    const controls = document.createElement('div');
    controls.className = "controls";
    controls.innerHTML = `
                <span class="fas fa-redo"></span>
                <div class="main">
                    <i class="fas fa-backward active" style="background-image: url(${icons.backwardIcon});"></i>
                    <i class="fas fa-play active" style="background-image: url(${icons.playIcon});"></i>
                    <i class="fas fa-pause" style="background-image: url(${icons.pauseIcon});"></i>
                    <i class="fas fa-forward active" style="background-image: url(${icons.forwardIcon});"></i>
                </div>
                <input type="range" class="volume-slider" max="1" value="1" step="0.1">
                <span class="fas fa-volume-up"></span>
            `;

    secondSection.appendChild(controls);

    section.appendChild(secondSection);

    const playlist = document.createElement('section');
    playlist.className = "playlist active";


    const backButton = document.createElement('img');
    backButton.src = icons.backIcon;
    backButton.className = "back-btn icon";
    playlist.appendChild(backButton);

    const playlistTitle = document.createElement('h1');
    playlistTitle.className = "title";
    playlistTitle.textContent = "playlist";
    playlist.appendChild(playlistTitle);

    for (let i = 0; i < songs.length; i++) {
        const queue = document.createElement('div');
        queue.className = i === 0 ? "queue active" : "queue";
        queue.innerHTML = `
                    <div class="queue-cover">
                        <img src=${songs[i].cover} alt="">
                        <i class="fas fa-pause" style="background-image: url(${icons.pauseIcon});"></i>
                    </div>
                    <p class="name">${songs[i].name}</p>
                `
        playlist.appendChild(queue);
    }

    section.appendChild(playlist);

    document.body.appendChild(section);
}

component();

app();