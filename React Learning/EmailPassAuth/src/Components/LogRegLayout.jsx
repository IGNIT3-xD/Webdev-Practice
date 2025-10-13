import React from 'react';
import Login from './Login';
import { NavLink, Outlet } from 'react-router';

const LogRegLayout = () => {
    return (
        <div>
            <div className='space-x-5 flex items-center justify-center mt-20'>
                <NavLink to={'/login'} className={'btn'}>Login</NavLink>
                <NavLink to={'/signup'} className={'btn'}>Registration</NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default LogRegLayout;