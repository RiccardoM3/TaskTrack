import { useState } from 'react';
import YearlyCalendar from '../components/YearlyCalendar/YearlyCalendar';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import DayInformationCard from '../components/DayInformationCard/DayInformationCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

function Main() {
    const year: number = new Date().getFullYear();

    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 59 },
        { id: 2, description: 'Go Gym', percentage: 81 },
        { id: 3, description: 'Study', percentage: 93 }
    ];

    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <h4 className="text-center mb-2">Yearly Calendar</h4>
                    <YearlyCalendar
                        year={year}
                        onDateChange={(newDate) => {
                            setSelectedDay(newDate);
                        }}
                    />
                </Card.Body>
            </Card>

            <Card className="mt-3">
                <Card.Body>
                    <h4 className="text-center">
                        Recurring Tasks
                        <Link to="/recurring-tasks" className="btn btn-sm btn-secondary ms-2">
                            <FontAwesomeIcon icon={solid('gear')} />
                        </Link>
                    </h4>
                    <div>
                        {dailyGoals.map((goal) => {
                            return (
                                <Row key={goal.id}>
                                    <Col>{goal.description}</Col>
                                    <Col>
                                        <ProgressBar variant="success" now={goal.percentage} />
                                    </Col>
                                    <Col>{goal.percentage}%</Col>
                                </Row>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>

            {selectedDay && <DayInformationCard day={selectedDay} />}
        </>
    );
}

export default Main;
