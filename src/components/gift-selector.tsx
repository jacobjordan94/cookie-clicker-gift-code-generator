interface GiftSelectorProps {
    selectedGift: string;
    onSelectGift: (code: string) => void;
}
// x, y: column and row of the box's sprite in icons.png
const gifts = [
    { x: 34, y: 6, name: 'White box with red ribbon' },
    { x: 16, y: 9, name: 'Red box with gold ribbon' },
    { x: 34, y: 3, name: 'Black box with silver ribbon' },
    { x: 34, y: 4, name: 'Blue box with orange ribbon' },
    { x: 34, y: 5, name: 'Green box with red ribbon' },
    { x: 34, y: 7, name: 'Brown box with silver ribbon' },
    { x: 34, y: 8, name: 'Sparkling gold and red box' },
    { x: 34, y: 9, name: 'Purple box with green ribbon' },
    { x: 34, y: 10, name: 'Pink box with white ribbon' },
    { x: 34, y: 11, name: 'Red heart-shaped box' },
    { x: 34, y: 12, name: 'Brown sack' },
];
export default function GiftSelector({ selectedGift, onSelectGift }: GiftSelectorProps) {
    return (
        <div className="gift-selector grid grid-rows-2 grid-cols-30">
            {gifts.map((gift, i) => {
                const code = `${gift.x} ${gift.y}`;
                return (
                    <button
                        key={code}
                        aria-label={gift.name}
                        aria-pressed={code === selectedGift}
                        className={`
                            gift-container ${i < 6 ? 'col-span-5' : 'col-span-6'}
                            h-16 hover:*:-translate-y-2 focus-visible:*:-translate-y-2
                            flex items-center justify-center cursor-pointer
                        `}
                        onClick={() => onSelectGift(code)}
                    >
                        <span className={`gift-frame transition-all ${code === selectedGift ? 'framed' : ''}`}>
                            <span
                                className="gift"
                                style={{ backgroundPosition: `${gift.x * -48}px ${gift.y * -48}px` }}
                            />
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
