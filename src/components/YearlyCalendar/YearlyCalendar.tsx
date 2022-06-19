import React from 'react';
import DateBox from './DateBox';
import './yearlyCalendar.css';

type Props = {
    year: number;
};

function YearlyCalendar(props: Props) {
    const days: Date[] = getDaysInYear(props.year);
    return (
        <div className="yearly-calendar">
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
                            year={props.year}
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
