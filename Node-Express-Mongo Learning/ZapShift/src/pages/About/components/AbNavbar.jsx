import React from 'react';
import { NavLink } from 'react-router';

const AbNavbar = () => {
    return (
        <div className='about-nav list-none flex items-center gap-6 md:gap-10 text-sm md:text-[16px]'>
            <li><NavLink to={'/about-us/story'}>Story</NavLink></li>
            <li><NavLink to={'/about-us/mission'}>Mission</NavLink></li>
            <li><NavLink to={'/about-us/success'}>Success</NavLink></li>
            <li><NavLink to={'/about-us/teams'}>Teams & Others</NavLink></li>
        </div>
    );
};

export default AbNavbar;