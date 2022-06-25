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
    ProgressBar,
    Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProgressCardHeader from './components/ProgressCardHeader/ProgressCardHeader';

function App() {
    const year: number = 2022; //TODO

    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 59 },
        { id: 2, description: 'Go Gym', percentage: 81 },
        { id: 3, description: 'Study', percentage: 93 }
    ];

    const dayGoals = {
        date: new Date(),
        everyDayTasks: [
            { id: 1, description: 'Work on TaskTrack', complete: true },
            { id: 2, description: 'Go Gym', complete: false },
            { id: 3, description: 'Study', complete: false }
        ],
        extraTasks: [{ id: 4, description: 'Message someone', complete: false }]
    };

    let day = new Date();
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
                                        <Col>
                                            <ProgressBar
                                                variant="success"
                                                now={goal.percentage}
                                            />
                                        </Col>
                                        <Col>{goal.percentage}%</Col>
                                    </Row>
                                );
                            })}
                        </div>

                        <YearlyCalendar year={year} />
                    </Card.Body>
                </Card>
                <Card className="mt-3">
                    <ProgressCardHeader
                        now={
                            (dayTasks.filter((e) => {
                                return e.complete;
                            }).length /
                                dayTasks.length) *
                            100
                        }
                        label={
                            'Tasks for ' +
                            day.toLocaleDateString('en-au', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })
                        }
                    />
                    <Card.Body>
                        <Form>
                            {dayTasks.map((goal) => {
                                return (
                                    <Card className="mb-2">
                                        <Card.Body className="py-2">
                                            <FormCheck
                                                label={goal.description}
                                                name={'task-' + goal.id}
                                                checked={goal.complete}
                                                key={goal.id}
                                                className="m-0"
                                                onChange={(e) => {
                                                    goal.complete =
                                                        e.target.value === 'on';
                                                }}
                                            ></FormCheck>
                                        </Card.Body>
                                    </Card>
                                );
                            })}
                            <Button variant="success">
                                <FontAwesomeIcon
                                    icon={solid('plus-circle')}
                                    className="me-1"
                                />
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
