import React from 'react';
import logo from '../../assets/Images/assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img className='' src={logo} alt="" />
            <p className='-ms-5 text-secondary font-bold text-xl'>ZapShift</p>
        </Link>
    );
};

export default Logo;