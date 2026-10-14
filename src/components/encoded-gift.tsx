import { useLayoutEffect, useRef, useState } from 'react';
import encodeCookieGift from '../utils/encode';

interface EncodedGiftProps {
    time: number;
    selectedGift: string;
    cookieValue: number;
    giftMessage: string;
    onTimeChange: (time: number) => void;
}

export default function EncodedGift({ time, selectedGift, cookieValue, giftMessage, onTimeChange }: EncodedGiftProps) {
    const encodedGiftMessage = encodeCookieGift(time, selectedGift, cookieValue, giftMessage);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const didCopy = copiedCode === encodedGiftMessage;

    // Grow the textarea
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`;
    }, [encodedGiftMessage]);

    const copyGiftMessageToClipboard = async () => {
        // Stamp the code with the current time, so a tab left open doesn't copy an expired code
        const now = Date.now();
        const freshCode = encodeCookieGift(now, selectedGift, cookieValue, giftMessage);
        onTimeChange(now);
        try {
            await navigator.clipboard.writeText(freshCode);
            setCopiedCode(freshCode);
        } catch {
            textareaRef.current?.select();
        }
    };

    return (
        <div className="encoded-gift-container flex flex-col gap-3">
            <textarea
                ref={textareaRef}
                rows={2}
                aria-label="Gift code"
                value={encodedGiftMessage}
                className="resize-none overflow-hidden text-center font-mono break-all"
                readOnly={true}
            />
            <button
                onClick={copyGiftMessageToClipboard}
                className="
                cursor-pointer framed underline
                transition duration-100
                hover:brightness-125 focus-visible:brightness-125
                active:translate-y-0.5 active:brightness-90
            "
            >
                {didCopy ? 'COPIED!' : 'COPY'}
            </button>
        </div>
    );
}
