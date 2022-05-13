import { formatTime } from './utils';

export const setMusic = (i, songs) => {
    const seekBar = document.querySelector('.music-seek-bar');
    const music = document.querySelector('#audio-source');
    const songName = document.querySelector('.current-song-name');
    const artistName = document.querySelector('.artist-name');
    const coverImage = document.querySelector('.cover');

    seekBar.value = 0;
    let song = songs[i];

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;

        const musicDuration = document.querySelector('.duration');
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    const currentMusicTime = document.querySelector('.current-time');
    currentMusicTime.innerHTML = '00 : 00';

    const queue = [...document.querySelectorAll('.queue')];
    queue.forEach(item => { item.classList.remove('active') });
    queue[i].classList.add('active');
};