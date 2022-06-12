import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import YearlyCalendar from './components/YearlyCalendar/YearlyCalendar';
import { Card, Container } from 'react-bootstrap';

function App() {
    const year = 2022; //TODO

    return (
        <div className="App">
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <YearlyCalendar year="2022" />
                    </Card.Body>
                </Card>
                <Card className="mt-3">
                    <Card.Header>Statistics</Card.Header>
                    <Card.Body>
                        <section>Overview</section>
                        <section>Day</section>
                        Targets / Achieved
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
