import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RecurringTask } from '../api/Task';
import TaskController from '../api/TaskController';
import Card from '../components/Card/Card';
import DayPicker from '../components/DayPicker/DayPicker';

function RecurringTasks() {
    const [recurringTasks, setRecurringTasks] = useState<RecurringTask[]>([]);
    const [inactiveRecurringTasks, setInactiveRecurringTasks] = useState<RecurringTask[]>([]);
    const [tabKey, setTabKey] = useState<string | null>('active');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [daysPicked, setDaysPicked] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setRecurringTasks(TaskController.getAllActiveRecurringTasks());
        setInactiveRecurringTasks(TaskController.getAllInactiveRecurringTasks());
    }, []);

    const onDaysPickedChanged = (newDaysPicked: number[]) => {
        setDaysPicked(newDaysPicked);
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        TaskController.addRecurringTask(description, startDate, endDate);
        setRecurringTasks(TaskController.getAllActiveRecurringTasks());
        setInactiveRecurringTasks(TaskController.getAllInactiveRecurringTasks());
        handleClose();
    };

    return (
        <Card className="mt-3">
            <Card.Header>
                <Row>
                    <Col className="text-start">
                        <Link to={'/'} className="text-white px-3">
                            <FontAwesomeIcon icon={solid('arrow-left')} />
                        </Link>
                    </Col>
                    <Col>Recurring Tasks</Col>
                    <Col>
                        <Button className="float-end me-2" variant="success" onClick={handleShow}>
                            <FontAwesomeIcon className="me-2" icon={solid('plus-circle')} />
                            New Recurring Task
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Tabs id="controlled-tab-example" activeKey={tabKey ?? 'active'} onSelect={(k) => setTabKey(k)}>
                    <Tab eventKey="active" title="Active">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th style={{ width: '15%' }}>Start</th>
                                    <th style={{ width: '15%' }}>End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recurringTasks.length === 0 && (
                                    <tr>
                                        <td colSpan={3}>No active recurring tasks</td>
                                    </tr>
                                )}
                                {recurringTasks.map((recurringTask) => {
                                    return (
                                        <tr key={recurringTask.task.id}>
                                            <td>{recurringTask.task.description}</td>
                                            <td>{recurringTask.startDate.toLocaleDateString()}</td>
                                            <td>
                                                {recurringTask.endDate
                                                    ? recurringTask.endDate.toLocaleDateString()
                                                    : null}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="inactive" title="Inactive">
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th style={{ width: '15%' }}>Start</th>
                                    <th style={{ width: '15%' }}>End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inactiveRecurringTasks.length === 0 && (
                                    <tr>
                                        <td colSpan={3}>No inactive recurring tasks</td>
                                    </tr>
                                )}
                                {inactiveRecurringTasks.map((recurringTask) => {
                                    return (
                                        <tr key={recurringTask.task.id}>
                                            <td>{recurringTask.task.description}</td>
                                            <td>{recurringTask.startDate.toLocaleDateString()}</td>
                                            <td>
                                                {recurringTask.endDate
                                                    ? recurringTask.endDate.toLocaleDateString()
                                                    : null}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Card.Body>

            <Modal size="lg" centered show={showModal} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Recurring Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                required
                                onChange={(e) => {
                                    setDescription(e.currentTarget.value);
                                }}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="start-date">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter email"
                                        defaultValue={new Date().toISOString().substring(0, 10)}
                                        required
                                        onChange={(e) => {
                                            setStartDate(new Date(e.currentTarget.value));
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="end-date">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter email"
                                        onChange={(e) => {
                                            setEndDate(new Date(e.currentTarget.value));
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="days">
                            <Form.Label>Days</Form.Label>
                            <DayPicker onChange={onDaysPickedChanged} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Card>
    );
}

export default RecurringTasks;
