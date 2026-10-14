export const MAX_LINES = 4;
export const MAX_LINE_LENGTH = 25;

// 4 lines only, max 25 chars per line
export function limitMessage(message: string) {
    return message
        .split('\n')
        .slice(0, MAX_LINES)
        .map(line => Array.from(line).slice(0, MAX_LINE_LENGTH).join(''))
        .join('\n');
}
