import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <ul className="navigation">
            <li><Link to="market">Market</Link></li>
            <li><Link to="create">Create</Link></li>
            <li><Link to="mynft/:address">My nft</Link></li>
        </ul>
    );
};

export default Nav;