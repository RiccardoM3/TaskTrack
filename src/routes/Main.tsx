import { useState } from 'react';
import YearlyCalendar from '../components/YearlyCalendar/YearlyCalendar';
import DayInformation from '../components/DayInformation/DayInformation';
import Card from '../components/Card/Card';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function Main() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    return (
        <Card className="mt-3">
            <Card.Header>
                <Row>
                    <Col></Col>
                    <Col>
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
                    </Col>
                    <Col>
                        <Link to="/recurring-tasks" className="btn me-2 float-end">
                            <FontAwesomeIcon icon={solid('edit')} /> Edit Recurring Tasks
                        </Link>
                    </Col>
                </Row>
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
