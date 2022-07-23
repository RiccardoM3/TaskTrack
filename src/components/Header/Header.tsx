import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <header>
            <nav>
                <div className="float-start">
                    <Link to="/" className="title">
                        <img src="/icon.svg" height="30" alt="TaskTrack Logo" className="me-2"></img>
                        <div>TaskTrack</div>
                    </Link>
                </div>

                <div className="float-end">
                    <Link to="/">Home</Link>
                    <Link to="/statistics">My Stats</Link>
                    <Link to="/login">Login</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
