import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RecurringTask } from '../api/Task';
import TaskController from '../api/TaskController';
import DayPicker from '../components/DayPicker/DayPicker';

function Main() {
    const [recurringTasks, setRecurringTasks] = useState<RecurringTask[]>([]);

    useEffect(() => {
        setRecurringTasks(TaskController.getAllActiveRecurringTasks());
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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

                <div>
                    {recurringTasks.map((recurringTask) => {
                        return (
                            <Row key={recurringTask.task.id}>
                                <Col>{recurringTask.task.description}</Col>
                            </Row>
                        );
                    })}
                </div>
            </Card.Body>

            <Modal size="lg" centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recurring Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="start-date">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter email" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="end-date">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter email" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="days">
                            <Form.Label>Days</Form.Label>
                            <DayPicker />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}

export default Main;
