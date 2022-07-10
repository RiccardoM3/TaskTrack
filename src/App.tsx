import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import RecurringTasks from './routes/RecurringTasks';
import PageNotFound from './routes/PageNotFound';

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/recurring-tasks" element={<RecurringTasks />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
