import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProgressCardHeader from '../ProgressCardHeader/ProgressCardHeader';

type Props = {
    day: Date;
};

type TaskInfo = {
    id: number;
    description: String;
    complete: boolean;
};

function DayInformationCard({ day }: Props) {
    const [dayTasks, setDayTasks] = useState<TaskInfo[]>([]);

    useEffect(() => {
        //TODO
        setDayTasks([
            { id: 1, description: 'Work on TaskTrack', complete: true },
            { id: 2, description: 'Go Gym', complete: false },
            { id: 3, description: 'Study', complete: false },
            { id: 4, description: 'Message someone', complete: false }
        ]);
    }, []);

    return (
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
                            <Card className="mb-2" key={goal.id}>
                                <Card.Body className="py-2">
                                    <FormCheck
                                        label={goal.description}
                                        name={'task-' + goal.id}
                                        checked={goal.complete}
                                        className="m-0"
                                        onChange={(e) => {
                                            let dayTask = dayTasks.filter((el) => {
                                                return el.id === goal.id;
                                            });
                                            if (dayTask.length > 0) {
                                                dayTask[0].complete = e.target.checked;
                                                setDayTasks([...dayTasks]);
                                            }
                                        }}
                                    ></FormCheck>
                                </Card.Body>
                            </Card>
                        );
                    })}
                    <Button variant="success">
                        <FontAwesomeIcon icon={solid('plus-circle')} className="me-1" />
                        Add new task for today
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default DayInformationCard;
