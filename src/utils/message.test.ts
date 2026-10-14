import { describe, expect, it } from 'vitest';
import { limitMessage, MAX_LINE_LENGTH, MAX_LINES } from './message';

describe('limitMessage', () => {
    it('leaves a message within the limits unchanged', () => {
        const message = 'Happy birthday!\nEnjoy the cookies';
        expect(limitMessage(message)).toBe(message);
    });

    it('allows exactly 4 lines', () => {
        const message = 'one\ntwo\nthree\nfour';
        expect(limitMessage(message)).toBe(message);
    });

    it('drops a 5th line', () => {
        expect(limitMessage('one\ntwo\nthree\nfour\nfive')).toBe('one\ntwo\nthree\nfour');
    });

    it('drops the empty 5th line created by pressing Enter on line 4', () => {
        expect(limitMessage('one\ntwo\nthree\nfour\n')).toBe('one\ntwo\nthree\nfour');
    });

    it('allows exactly 25 characters on a line', () => {
        const line = 'a'.repeat(MAX_LINE_LENGTH);
        expect(limitMessage(line)).toBe(line);
    });

    it('drops the 26th character of a line', () => {
        expect(limitMessage('a'.repeat(MAX_LINE_LENGTH) + 'b')).toBe('a'.repeat(MAX_LINE_LENGTH));
    });

    it('limits each line separately', () => {
        const long = 'x'.repeat(30);
        expect(limitMessage(`${long}\nshort\n${long}`)).toBe(`${'x'.repeat(25)}\nshort\n${'x'.repeat(25)}`);
    });

    it('counts an emoji as one character and never splits it', () => {
        const line = '🍪'.repeat(30);
        const result = limitMessage(line);
        expect(Array.from(result)).toHaveLength(MAX_LINE_LENGTH);
        expect(result).toBe('🍪'.repeat(MAX_LINE_LENGTH));
    });

    it('fits at most 4 full lines', () => {
        const full = Array(6).fill('z'.repeat(40)).join('\n');
        const lines = limitMessage(full).split('\n');
        expect(lines).toHaveLength(MAX_LINES);
        expect(lines.every(line => line.length === MAX_LINE_LENGTH)).toBe(true);
    });
});
