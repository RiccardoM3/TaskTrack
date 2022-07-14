import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RecurringTask } from '../api/Task';
import TaskController from '../api/TaskController';
import DayPicker from '../components/DayPicker/DayPicker';

function RecurringTasks() {
    const [recurringTasks, setRecurringTasks] = useState<RecurringTask[]>([]);
    const [inactiveRecurringTasks, setInactiveRecurringTasks] = useState<RecurringTask[]>([]);
    const [tabKey, setTabKey] = useState<string | null>('active');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
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

    const handleSubmit = () => {
        TaskController.addRecurringTask(description, startDate, endDate);
        handleClose();
    };

    return (
        <Card className="mt-3">
            <Card.Body>
                <div className="float-start">
                    <Link to={'/'} className="btn btn-sm btn-secondary me-2 align-top">
                        <FontAwesomeIcon icon={solid('chevron-left')} />
                    </Link>
                    <h4 className="d-inline">Recurring Tasks</h4>
                </div>
                <Button className="float-end" variant="success" onClick={handleShow}>
                    <FontAwesomeIcon className="me-2" icon={solid('plus-circle')} />
                    New Recurring Task
                </Button>

                <div className="clearfix" />

                <Tabs
                    id="controlled-tab-example"
                    activeKey={tabKey ?? 'active'}
                    onSelect={(k) => setTabKey(k)}
                    className=""
                >
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
                                        <td>No active recurring tasks</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                                {recurringTasks.map((recurringTask) => {
                                    return (
                                        <tr key={recurringTask.task.id}>
                                            <td>{recurringTask.task.description}</td>
                                            <td>{recurringTask.startDate.toLocaleDateString()}</td>
                                            <td>{recurringTask.endDate.toLocaleDateString()}</td>
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
                                        <td>No inactive recurring tasks</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                                {inactiveRecurringTasks.map((recurringTask) => {
                                    return (
                                        <tr key={recurringTask.task.id}>
                                            <td>{recurringTask.task.description}</td>
                                            <td>{recurringTask.startDate.toLocaleDateString()}</td>
                                            <td>{recurringTask.endDate.toLocaleDateString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Card.Body>

            <Modal size="lg" centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recurring Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
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
                                        value={new Date().toISOString().substring(0, 10)}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default RecurringTasks;
