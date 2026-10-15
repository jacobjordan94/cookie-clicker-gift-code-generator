import { useState } from 'react';
import GiftSelector from './components/gift-selector';
import CookieValue from './components/cookie-value';
import GiftMessage from './components/gift-message';
import EncodedGift from './components/encoded-gift';
import { clampCookies } from './utils/cookies';

function App() {
    const [selectedGift, setSelectedGift] = useState('34 6');
    const [cookieInput, setCookieInput] = useState('100');
    const [giftMessage, setGiftMessage] = useState('');
    const [giftTime, setGiftTime] = useState(() => Date.now());
    const cookieValue = clampCookies(cookieInput);

    return (
        <main className="flex flex-col min-h-svh items-center justify-center p-6">
            <div className="children-container framed w-fit 3xl:scale-150 4xl:scale-200">
                <div id="send-a-gift" className="flex justify-center my-2">
                    <span>SEND A GIFT</span>
                </div>
                <div className="inner-container p-2 m-0.5 rounded-sm border border-white/10">
                    <div className="title-gift-container flex justify-center scale-75">
                        <div className="gift" style={{ backgroundPosition: `${34 * -48}px ${6 * -48}px` }} />
                    </div>
                    <div className="line"></div>
                    <CookieValue
                        value={cookieInput}
                        onChange={value => {
                            setCookieInput(value);
                            setGiftTime(Date.now());
                        }}
                        onBlur={() => setCookieInput(String(cookieValue))}
                    />
                    <div className="line"></div>
                    <GiftMessage
                        giftMessage={giftMessage}
                        onGiftMessageChange={giftMessage => {
                            setGiftMessage(giftMessage);
                            setGiftTime(Date.now());
                        }}
                    />
                    <div className="line"></div>
                    <GiftSelector
                        selectedGift={selectedGift}
                        onSelectGift={giftCode => {
                            setSelectedGift(giftCode);
                            setGiftTime(Date.now());
                        }}
                    />
                    <div className="line"></div>
                    <EncodedGift
                        time={giftTime}
                        selectedGift={selectedGift}
                        cookieValue={cookieValue}
                        giftMessage={giftMessage}
                        onTimeChange={setGiftTime}
                    />
                </div>
            </div>
        </main>
    );
}

export default App;
