import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import YearlyCalendar from './components/YearlyCalendar/YearlyCalendar';
import { Card, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import DayInformationCard from './components/DayInformationCard/DayInformationCard';

function App() {
    const year: number = 2022; //TODO

    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 59 },
        { id: 2, description: 'Go Gym', percentage: 81 },
        { id: 3, description: 'Study', percentage: 93 }
    ];

    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    return (
        <div className="App">
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <h4>Your Every-Day Goals</h4>
                        <div className="pb-4">
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

                        <YearlyCalendar
                            year={year}
                            onDateChange={(newDate) => {
                                setSelectedDay(newDate);
                            }}
                        />
                    </Card.Body>
                </Card>

                {selectedDay && <DayInformationCard day={selectedDay} />}
            </Container>
            <Footer />
        </div>
    );
}

export default App;
