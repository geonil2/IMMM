import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="market">Market</Link></li>
                <li><Link to="detail/:id">Detail</Link></li>
                <li><Link to="create">Create</Link></li>
                <li><Link to="mynft/:address">My nft</Link></li>
            </ul>
        </header>
    );
};

export default Header;