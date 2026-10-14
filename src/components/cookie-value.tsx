interface CookieValueProps {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
}
export default function CookieValue({ value, onChange, onBlur }: CookieValueProps) {
    return (
        <div className="cookie-value-container flex flex-row">
            <div className="label-container flex justify-center items-center flex-7">
                <label htmlFor="cookie-value-input" className="text-center">
                    You may put between 1 and 1000 cookies in the gift box.
                </label>
            </div>
            <div className="right flex-5">
                <div className="text-center">
                    <span className="tiny-cookie inline-block font-bold">Cookies</span>
                </div>
                <input
                    id="cookie-value-input"
                    value={value}
                    className="w-full border text-center font-bold bg-white text-black"
                    type="number"
                    placeholder="1"
                    min={1}
                    max={1000}
                    step={1}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
}
