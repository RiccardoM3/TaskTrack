import React from 'react';
import BannerAlert from '../BannerAlert/BannerAlert';
import './header.css';

function Header() {
    return (
        <header>
            <nav>TaskTrack</nav>
            <BannerAlert variant="success">
                Your data is stored on this computer. You can login to backup
                and save your data across multiple computers X
            </BannerAlert>
        </header>
    );
}

export default Header;
