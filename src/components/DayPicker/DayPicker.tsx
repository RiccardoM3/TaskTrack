import './DayPicker.css';

function DayPicker() {
    return (
        <select multiple className="day-picker">
            <optgroup>
                <option value="1" selected>
                    Mon
                </option>
                <option value="2" selected>
                    Tue
                </option>
                <option value="3" selected>
                    Wed
                </option>
                <option value="4" selected>
                    Thu
                </option>
                <option value="5" selected>
                    Fri
                </option>
                <option value="6" selected>
                    Sat
                </option>
                <option value="7" selected>
                    Sun
                </option>
            </optgroup>
        </select>
    );
}

export default DayPicker;
