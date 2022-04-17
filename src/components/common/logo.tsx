import React from 'react';
import { Link } from 'react-router-dom';
import BasicLogo from '../../assets/image/common/basic_logo.svg';

const Logo = () => {
    return (
        <Link to="/"><img className="logo-img" src={BasicLogo} alt="Logo image" /></Link>
    );
};  

export default Logo;