import { useState } from 'react';
import YearlyCalendar from '../components/YearlyCalendar/YearlyCalendar';
import DayInformation from '../components/DayInformation/DayInformation';
import Card from '../components/Card/Card';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Main() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    return (
        <Card className="mt-3">
            <Card.Header>
                <span
                    className="px-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setYear((prev) => prev - 1);
                    }}
                >
                    <FontAwesomeIcon icon={solid('chevron-left')} />
                </span>
                <span className="px-2">{year}</span>
                <span
                    className="px-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setYear((prev) => prev + 1);
                    }}
                >
                    <FontAwesomeIcon icon={solid('chevron-right')} />
                </span>
            </Card.Header>
            <Card.Body>
                <YearlyCalendar
                    year={year}
                    setYear={setYear}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                />
                <DayInformation day={selectedDay} />
            </Card.Body>
        </Card>
    );
}

export default Main;
