import { limitMessage, MAX_LINES } from '../utils/message';

interface GiftMessageProps {
    giftMessage: string;
    onGiftMessageChange: (giftMessage: string) => void;
}
export default function GiftMessage({ giftMessage, onGiftMessageChange }: GiftMessageProps) {
    return (
        <div className="gift-message-container">
            <div className="flex justify-center">
                <label htmlFor="gift-message-input">
                    You can leave a note. Don't be rude!
                    <br />
                    Maximum 4 lines and 100 characters.
                </label>
            </div>
            <textarea
                id="gift-message-input"
                className="w-full resize-none border text-center text-black"
                rows={MAX_LINES}
                value={giftMessage}
                onChange={e => onGiftMessageChange(limitMessage(e.target.value))}
            />
        </div>
    );
}
