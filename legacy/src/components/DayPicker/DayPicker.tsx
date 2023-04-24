import { Dispatch, SetStateAction } from 'react';
import './DayPicker.css';

type Props = {
    daysPicked: number[];
    setDaysPicked: Dispatch<SetStateAction<number[]>>;
};

function DayPicker({ daysPicked, setDaysPicked }: Props) {
    const dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const toggleSelected = (day: number) => {
        if (daysPicked.includes(day)) {
            daysPicked = daysPicked.filter((e) => {
                return e !== day;
            });
        } else {
            daysPicked.push(day);
        }
        setDaysPicked([...daysPicked]);
    };

    return (
        <div className="day-picker">
            {dayNames.map((dayName: string, index: number) => {
                let dayIndex = index + 1;
                return (
                    <div
                        key={dayIndex}
                        className={'day-picker-el' + (daysPicked.includes(dayIndex) ? ' selected' : '')}
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
