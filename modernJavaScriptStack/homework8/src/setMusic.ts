import { formatTime } from './utils';
import { ISong } from './data';

export const setMusic = (i: number, songs: ISong[]): void => {
    const seekBar: HTMLInputElement = document.querySelector('.music-seek-bar');
    const music: HTMLMediaElement = document.querySelector('#audio-source');
    const songName: HTMLElement = document.querySelector('.current-song-name');
    const artistName: HTMLElement = document.querySelector('.artist-name');
    const coverImage: HTMLImageElement = document.querySelector('.cover');

    seekBar.value = '0';
    let song = songs[i];

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = String(music.duration);

        const musicDuration: HTMLElement = document.querySelector('.duration');
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    const currentMusicTime: HTMLElement = document.querySelector('.current-time');
    currentMusicTime.innerHTML = '00 : 00';

    const queue: NodeListOf<Element> = document.querySelectorAll('.queue');
    queue.forEach((item) => { item.classList.remove('active') });
    queue[i].classList.add('active');
};