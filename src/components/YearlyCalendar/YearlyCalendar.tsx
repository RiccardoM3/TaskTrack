import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import DateBox from './DateBox';
import './yearlyCalendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

type Props = {
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    selectedDay: Date;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};

function YearlyCalendar({ year, setYear, selectedDay, setSelectedDay }: Props) {
    const days: Date[] = getDaysInYear(year);
    return (
        <div className="yearly-calendar">
            <Row>
                <Col></Col>
                <Col>
                    <InputGroup className="mb-3 justify-content-center">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setYear(year - 1);
                            }}
                        >
                            <FontAwesomeIcon icon={solid('chevron-left')} />
                        </Button>
                        <InputGroup.Text style={{ fontSize: '18px' }}>{year}</InputGroup.Text>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setYear(year + 1);
                            }}
                        >
                            <FontAwesomeIcon icon={solid('chevron-right')} />
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <Link to="/statistics" className="btn btn-success float-end">
                        <FontAwesomeIcon icon={solid('chart-column')} /> View Stats
                    </Link>
                </Col>
            </Row>

            <div className="calendar-container">
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
                                key={date.getTime()}
                                selected={date.toDateString() === selectedDay.toDateString()}
                                onClick={() => {
                                    setSelectedDay(date);
                                }}
                            ></DateBox>
                        );
                    })}
                </div>
                <div className="month-label-container">
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>Mar</div>
                    <div>Apr</div>
                    <div>May</div>
                    <div>Jun</div>
                    <div>Jul</div>
                    <div>Aug</div>
                    <div>Sep</div>
                    <div>Oct</div>
                    <div>Nov</div>
                    <div>Dec</div>
                </div>
            </div>
        </div>
    );
}

function getDaysInYear(year: number): Date[] {
    let date: Date = new Date(year, 0, 1);
    let days = [];

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
