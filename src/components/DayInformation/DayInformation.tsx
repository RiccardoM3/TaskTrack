import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Form, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ProgressHeader from '../ProgressHeader/ProgressHeader';
import CheckboxItem from './CheckboxItem';
import TaskController from '../../api/TaskController';
import { Task } from '../../api/Task';
import { Link } from 'react-router-dom';

type Props = {
    day: Date;
};

function DayInformation({ day }: Props) {
    const [dayTasks, setDayTasks] = useState<Task[]>([]);
    const [newTaskOpen, setNewTaskOpen] = useState<boolean>(false);
    const descriptionElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let dayTasks: Task[] = TaskController.getTasksForDate(day);
        setDayTasks(dayTasks);
        setNewTaskOpen(false);
    }, [day]);

    const addNewTaskSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!descriptionElement.current) {
            alert('Error occurred');
            return;
        }

        const description = descriptionElement.current.value;

        TaskController.addTaskToDate(day, description);
        let dayTasks: Task[] = TaskController.getTasksForDate(day);
        setDayTasks(dayTasks);

        setNewTaskOpen(false);
    };

    return (
        <>
            <div className="mb-3 mt-4">
                <ProgressHeader
                    now={
                        dayTasks.length === 0
                            ? 0
                            : (dayTasks.filter((e) => {
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
            </div>

            {dayTasks.length === 0 && <div>No Tasks</div>}
            <Form>
                {dayTasks.map((task) => {
                    return (
                        <div className="d-flex mb-2" key={task.id}>
                            <CheckboxItem>
                                <FormCheck
                                    label={task.description}
                                    name={'task-' + task.id}
                                    checked={task.complete}
                                    className="m-0"
                                    onChange={(e) => {
                                        TaskController.setTaskCompleteForDate(day, task.id, e.target.checked);
                                        let dayTasks: Task[] = TaskController.getTasksForDate(day);
                                        setDayTasks(dayTasks);
                                    }}
                                ></FormCheck>
                            </CheckboxItem>
                            <Button
                                variant="danger"
                                className="ms-2"
                                onClick={() => {
                                    TaskController.removeTaskFromDate(day, task.id);
                                    let dayTasks: Task[] = TaskController.getTasksForDate(day);
                                    setDayTasks(dayTasks);
                                }}
                            >
                                <FontAwesomeIcon icon={solid('trash')} />
                            </Button>
                        </div>
                    );
                })}
            </Form>
            {!newTaskOpen && (
                <>
                    <Button
                        variant="success"
                        onClick={() => {
                            setNewTaskOpen(true);
                        }}
                    >
                        <FontAwesomeIcon icon={solid('plus-circle')} className="me-1" />
                        Add New Task
                    </Button>
                    <Link to="/recurring-tasks" className="btn btn-success ms-2">
                        <FontAwesomeIcon icon={solid('edit')} /> Edit Recurring Tasks
                    </Link>
                </>
            )}

            {newTaskOpen && (
                <Form className="d-flex" onSubmit={addNewTaskSubmit}>
                    <Form.Control
                        ref={descriptionElement}
                        type="text"
                        name="description"
                        required
                        maxLength={196}
                        placeholder="New Task Description"
                        className="me-2"
                    />
                    <Button type="submit" variant="success" className="me-2">
                        <FontAwesomeIcon icon={solid('check')} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            setNewTaskOpen(false);
                        }}
                    >
                        <FontAwesomeIcon icon={solid('xmark')} />
                    </Button>
                </Form>
            )}
        </>
    );
}

export default DayInformation;