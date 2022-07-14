import { useState } from 'react';
import './DayPicker.css';

type Props = {
    onChange?: (newValue: number[]) => void;
};

function DayPicker({ onChange }: Props) {
    let [pickedDays, setPickedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
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
                let dayIndex = index + 1;
                return (
                    <div
                        key={dayIndex}
                        className={'day-picker-el' + (pickedDays.includes(dayIndex) ? ' selected' : '')}
                        onClick={() => {
                            toggleSelected(dayIndex);
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
