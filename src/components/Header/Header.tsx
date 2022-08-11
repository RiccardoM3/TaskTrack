import { Navbar, Container, Nav } from 'react-bootstrap';
import './header.css';

function Header() {
    return (
        <header>
            <Navbar expand="md">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="/icon.svg" height="30" alt="TaskTrack Logo" className="me-2"></img>
                        <span>TaskTrack</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/statistics">My Stats</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
