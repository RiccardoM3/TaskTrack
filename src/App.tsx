import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import YearlyCalendar from './components/YearlyCalendar/YearlyCalendar';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormCheck,
    Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function App() {
    const year: number = 2022; //TODO

    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 29 },
        { id: 2, description: 'Go Gym', percentage: 29 },
        { id: 3, description: 'Study', percentage: 29 }
    ];

    const dayGoals = {
        date: new Date(),
        everyDayTasks: [
            { id: 1, description: 'Work on TaskTrack', complete: true },
            { id: 2, description: 'Go Gym', complete: false },
            { id: 3, description: 'Study', complete: false }
        ],
        extraTasks: [{ id: 1, description: 'Message someone', complete: false }]
    };

    let dayTasks = [...dayGoals.everyDayTasks, ...dayGoals.extraTasks];

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
                                        <Col>{goal.percentage}%</Col>
                                    </Row>
                                );
                            })}
                        </div>

                        <YearlyCalendar year={year} />
                    </Card.Body>
                </Card>
                <Card className="mt-3">
                    <Card.Header>
                        Tuesday 27/06/2020 =====================/===========
                    </Card.Header>
                    <Card.Body>
                        <div>Tasks</div>
                        <Form>
                            {dayTasks.map((goal) => {
                                return (
                                    <FormCheck
                                        label={goal.description}
                                        name={'task-' + goal.id}
                                        checked={goal.complete}
                                    ></FormCheck>
                                );
                            })}
                            <Button variant="success" size="sm">
                                <FontAwesomeIcon icon={solid('plus-circle')} />
                                Add new task for today
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
