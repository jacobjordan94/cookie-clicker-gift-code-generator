export default function encodeCookieGift(time: number, selectedGift: string, cookieValue: number, giftMessage: string) {
    const gm = giftMessage.replaceAll('|', '/$/');
    const cookieGiftString = `MAIL|${time}|${cookieValue}|${selectedGift}|${gm}|`;
    const bytes = new TextEncoder().encode(cookieGiftString);
    return btoa(String.fromCharCode(...bytes));
}
