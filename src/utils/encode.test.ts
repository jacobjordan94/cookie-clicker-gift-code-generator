import { describe, expect, it } from 'vitest';
import encodeCookieGift from './encode';

// Reverse of encodeCookieGift: Base64 -> bytes -> UTF-8 string
function decode(code: string) {
    const bytes = Uint8Array.from(atob(code), char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

const TIME = 1791940915230;

describe('encodeCookieGift', () => {
    it('encodes the MAIL format as Base64', () => {
        const code = encodeCookieGift(TIME, '34 6', 100, 'Hello');
        expect(decode(code)).toBe(`MAIL|${TIME}|100|34 6|Hello|`);
    });

    it('handles an empty message', () => {
        const code = encodeCookieGift(TIME, '34 6', 1, '');
        expect(decode(code)).toBe(`MAIL|${TIME}|1|34 6||`);
    });

    it('keeps line breaks in the message', () => {
        const code = encodeCookieGift(TIME, '34 6', 100, 'line one\nline two');
        expect(decode(code)).toBe(`MAIL|${TIME}|100|34 6|line one\nline two|`);
    });

    it('escapes | in the message so it cannot break the format', () => {
        const code = encodeCookieGift(TIME, '34 6', 100, 'a|b||c');
        expect(decode(code)).toBe(`MAIL|${TIME}|100|34 6|a/$/b/$//$/c|`);
    });

    it('encodes non-Latin characters and emoji as UTF-8 without throwing', () => {
        const message = 'Café 日本 🍪';
        const code = encodeCookieGift(TIME, '34 6', 100, message);
        expect(decode(code)).toBe(`MAIL|${TIME}|100|34 6|${message}|`);
    });

    it('produces valid Base64', () => {
        const code = encodeCookieGift(TIME, '16 9', 1000, 'Enjoy! 🍪');
        expect(code).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
    });
});
