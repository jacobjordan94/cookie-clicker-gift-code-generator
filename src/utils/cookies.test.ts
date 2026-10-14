import { describe, expect, it } from 'vitest';
import { clampCookies } from './cookies';

describe('clampCookies', () => {
    it('keeps a whole number within the range', () => {
        expect(clampCookies('100')).toBe(100);
    });

    it('allows the limits themselves', () => {
        expect(clampCookies('1')).toBe(1);
        expect(clampCookies('1000')).toBe(1000);
    });

    it('treats an empty input as 1', () => {
        expect(clampCookies('')).toBe(1);
    });

    it('treats text that is not a number as 1', () => {
        expect(clampCookies('abc')).toBe(1);
    });

    it('rounds decimals to the nearest whole number', () => {
        expect(clampCookies('2.6')).toBe(3);
        expect(clampCookies('2.4')).toBe(2);
    });

    it('caps values above 1000', () => {
        expect(clampCookies('5000')).toBe(1000);
    });

    it('raises zero and negative values to 1', () => {
        expect(clampCookies('0')).toBe(1);
        expect(clampCookies('-4')).toBe(1);
    });
});
