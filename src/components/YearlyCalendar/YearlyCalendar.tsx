import React from 'react';
import DateBox from './DateBox';
import './yearlyCalendar.css';

function getDaysInYear(year: number): Date[] {
    var date: Date = new Date(year, 1, 1);
    var days = [];
    while (date.getFullYear() === year) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function YearlyCalendar(props: any) {
    const days: Date[] = getDaysInYear(2022);
    return (
        <div className="yearly-calendar bg-light">
            <div className="grid-container">
                <div>Mon</div>
                <div>Tues</div>
                <div>Wed</div>
                <div>Thur</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
                {days.map((date: Date) => {
                    return <DateBox date={date}></DateBox>;
                })}
            </div>
        </div>
    );
}

export default YearlyCalendar;
