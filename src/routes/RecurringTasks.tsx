import { Card, Col, ProgressBar, Row } from 'react-bootstrap';

function Main() {
    const dailyGoals = [
        { id: 1, description: 'Work on TaskTrack', percentage: 59 },
        { id: 2, description: 'Go Gym', percentage: 81 },
        { id: 3, description: 'Study', percentage: 93 }
    ];

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <h4 className="text-center">Recurring Tasks</h4>
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
        </>
    );
}

export default Main;
