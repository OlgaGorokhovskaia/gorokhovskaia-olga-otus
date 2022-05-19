import { formatTime } from './utils';
import { ISong } from './data';

export const setMusic = (i: number, songs: ISong[]): void => {
    const seekBar: HTMLInputElement | null = document.querySelector('.music-seek-bar');
    const music: HTMLMediaElement | null = document.querySelector('#audio-source');
    const songName: HTMLElement | null = document.querySelector('.current-song-name');
    const artistName: HTMLElement | null = document.querySelector('.artist-name');
    const coverImage: HTMLImageElement | null = document.querySelector('.cover');

    if (seekBar) seekBar.value = '0';
    let song = songs[i];

    if (music) music.src = song.path;

    if (songName) songName.innerHTML = song.name;
    if (artistName) artistName.innerHTML = song.artist;
    if (coverImage) coverImage.src = song.cover;

    setTimeout(() => {
        if (seekBar && music) seekBar.max = String(music.duration);

        const musicDuration: HTMLElement | null = document.querySelector('.duration');
        if (musicDuration && music) musicDuration.innerHTML = formatTime(music.duration);
    }, 300);

    const currentMusicTime: HTMLElement | null = document.querySelector('.current-time');
    if (currentMusicTime) currentMusicTime.innerHTML = '00 : 00';

    const queue: NodeListOf<Element> = document.querySelectorAll('.queue');
    queue.forEach((item) => { item.classList.remove('active') });
    queue[i].classList.add('active');
};