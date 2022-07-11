import { useState } from 'react';
import './DayPicker.css';

function DayPicker() {
    let [pickedDays, setPickedDays] = useState([1, 2, 3, 4, 5, 6, 7]);
    const dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const toggleSelected = (day: number) => {
        if (pickedDays.includes(day)) {
            pickedDays = pickedDays.filter((e) => {
                return e !== day;
            });
        } else {
            pickedDays.push(day);
        }
        setPickedDays([...pickedDays]);
    };

    return (
        <div className="day-picker">
            {dayNames.map((dayName: string, index: number) => {
                return (
                    <div
                        className={'day-picker-el' + (pickedDays.includes(index) ? ' selected' : '')}
                        onClick={() => {
                            toggleSelected(index);
                        }}
                    >
                        {dayName}
                    </div>
                );
            })}
        </div>
    );
}

export default DayPicker;
