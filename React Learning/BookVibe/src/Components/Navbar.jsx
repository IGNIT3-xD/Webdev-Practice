import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-14 fixed top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
                        <NavLink to={'/'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Home</NavLink>
                        <NavLink to={'/listed-books'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Listed Books</NavLink>
                        <NavLink to={'/pages-to-read'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Pages to Read</NavLink>
                    </ul>
                </div>
                <p className='text-xl font-bold'>Book Vibe</p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-5">
                    <NavLink to={'/'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Home</NavLink>
                    <NavLink to={'/listed-books'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Listed Books</NavLink>
                    <NavLink to={'/pages-to-read'} className={'font-medium hover:border border-amber-400 px-2 py-1 rounded-md hover:text-green-400'}>Pages to Read</NavLink>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;