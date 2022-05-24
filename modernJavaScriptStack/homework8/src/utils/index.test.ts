import { formatTime } from '.';

describe('formatTime', () => {
    test('time is 0', () => {
        expect(formatTime(0)).toEqual('00 : 00');
    });

    test('time is 999', () => {
        expect(formatTime(999)).toEqual('16 : 39');
    });
});