import * as musics from '@Musics';
import * as covers from '@Covers';

export interface ISong {
    name: string;
    path: string;
    artist: string;
    cover: string;
};

export const songs: ISong[] = [{
        name: 'Dog barking',
        path: musics.song1,
        artist: 'artist 1',
        cover: covers.cover1,
    },
    {
        name: 'Geese',
        path: musics.song2,
        artist: 'artist 2',
        cover: covers.cover2,
    }, {
        name: 'Keyboard typing',
        path: musics.song3,
        artist: 'artist 3',
        cover: covers.cover3,
    },
    {
        name: 'Rain',
        path: musics.song4,
        artist: 'artist 4',
        cover: covers.cover4,
    }, {
        name: 'Timer',
        path: musics.song5,
        artist: 'artist 5',
        cover: covers.cover5,
    },
    {
        name: 'Trumpet fanfare',
        path: musics.song6,
        artist: 'artist 6',
        cover: covers.cover6,
    },
];