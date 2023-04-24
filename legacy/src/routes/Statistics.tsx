import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';

function Statistics() {
    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 59 },
        { id: 2, description: 'Go Gym', percentage: 81 },
        { id: 3, description: 'Study', percentage: 93 }
    ];

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
                    <Col></Col>
                </Row>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
        </Card>
    );
}

export default Statistics;
