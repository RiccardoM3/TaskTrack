import { useState } from 'react';
import YearlyCalendar from '../components/YearlyCalendar/YearlyCalendar';
import DayInformation from '../components/DayInformation/DayInformation';
import Card from '../components/Card/Card';

function Main() {
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    return (
        <Card className="mt-3">
            <Card.Header>Tracker</Card.Header>
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
