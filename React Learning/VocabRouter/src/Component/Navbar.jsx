import React from 'react';
import { NavLink } from 'react-router';
import ThemeController from './ThemeController';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm lg:px-14">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <NavLink className={'p-2'} to={"/"}>Home</NavLink>
                        <NavLink className={'p-2'} to={"/about"}>About Us</NavLink>
                        <NavLink className={'p-2'} to={"/contact"}>Contact Us</NavLink>
                    </ul>
                </div>
                <h4 className='text-xl font-bold text-[#F4991A]'>Vocab <span className='text-black'>Router</span></h4>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex items-center gap-5">
                    <NavLink className={'hover:bg-[#ffd901] px-4 py-2 rounded-sm'} to={"/"}>Home</NavLink>
                    <NavLink className={'hover:bg-[#ffd901] px-4 py-2 rounded-sm'} to={"/about"}>About Us</NavLink>
                    <NavLink className={'hover:bg-[#ffd901] px-4 py-2 rounded-sm'} to={"/contact"}>Contact Us</NavLink>
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeController></ThemeController>
            </div>
        </div>
    );
};

export default Navbar;