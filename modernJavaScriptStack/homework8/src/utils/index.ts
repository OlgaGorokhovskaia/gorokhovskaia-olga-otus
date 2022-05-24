export const formatTime = (time: number): string  => {
    const min: number = Math.floor(time / 60);
    const sec: number = Math.floor(time % 60);

    let preparedMin: string = min < 10 ? `0${min}` : String(min);
    let preparedSec: string = sec < 10 ? `0${sec}` : String(sec);

    return `${preparedMin} : ${preparedSec}`;
};