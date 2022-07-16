import './App.css';
import './Overrides.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import RecurringTasks from './routes/RecurringTasks';
import PageNotFound from './routes/PageNotFound';
import Statistics from './routes/Statistics';
import Login from './routes/Login';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="bg-light">
                <Container className="pt-1 pb-4">
                    <Routes>
                        <Route path="/" element={<Main />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/recurring-tasks" element={<RecurringTasks />}></Route>
                        <Route path="/statistics" element={<Statistics />}></Route>

                        <Route path="*" element={<PageNotFound />}></Route>
                    </Routes>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default App;
