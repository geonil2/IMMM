import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li><Link to="market">market</Link></li>
                <li><Link to="detail:/id">detail</Link></li>
                <li><Link to="create">create</Link></li>
                <li><Link to="mynft/:address">my nft</Link></li>
            </ul>
        </div>
    );
};

export default Header;