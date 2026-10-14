export const MIN_COOKIES = 1;
export const MAX_COOKIES = 1000;

// Turn whatever is typed into the cookie input into a whole number from 1 to 1000
export function clampCookies(input: string) {
    return Math.min(MAX_COOKIES, Math.max(MIN_COOKIES, Math.round(Number(input)) || MIN_COOKIES));
}
