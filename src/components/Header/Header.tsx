import './header.css';

function Header() {
    return (
        <header>
            <nav>
                <img src="/icon.svg" height="30" alt="TaskTrack Logo" className="bg-light me-2 rounded"></img>
                TaskTrack
            </nav>
        </header>
    );
}

export default Header;
