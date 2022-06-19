import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DateBox from './DateBox';
import './yearlyCalendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

type Props = {
    year: number;
};

function YearlyCalendar(props: Props) {
    const [year, setYear] = useState(props.year);

    const days: Date[] = getDaysInYear(year);
    return (
        <div className="yearly-calendar">
            <div className="">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        setYear(year - 1);
                    }}
                >
                    <FontAwesomeIcon icon={solid('chevron-left')} />
                </Button>
                <h4 className="d-inline px-3">{year}</h4>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        setYear(year + 1);
                    }}
                >
                    <FontAwesomeIcon icon={solid('chevron-right')} />
                </Button>
            </div>
            <div className="grid-container">
                <div className="">Mon</div>
                <div>Tues</div>
                <div>Wed</div>
                <div>Thur</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
                {days.map((date: Date) => {
                    return (
                        <DateBox
                            year={year}
                            date={date}
                            key={date.toString()}
                        ></DateBox>
                    );
                })}
            </div>
        </div>
    );
}

function getDaysInYear(year: number): Date[] {
    var date: Date = new Date(year, 0, 1);
    var days = [];

    //Fill in the days prior to the year that are in the same week
    date.setDate(date.getDate() - 1);
    while (date.getDay() !== 0) {
        days.push(new Date(date));
        date.setDate(date.getDate() - 1);
    }
    days.reverse();

    //Fill in the days of the year
    date = new Date(year, 0, 1);
    while (date.getFullYear() === year) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    //Fill in the days following the year that are in the same week
    while (date.getDay() !== 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days;
}

export default YearlyCalendar;
