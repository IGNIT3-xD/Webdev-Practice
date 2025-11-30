import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from './../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth()

    const links = <>
        <li><NavLink to={'/dashboard/my-parcels'}>Dashboard</NavLink></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li><NavLink to={'/about-us'}>About Us</NavLink></li>
        <li><NavLink to={'add-parcel'}>Parcel</NavLink></li>
        <li><NavLink>Contact</NavLink></li>
    </>

    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('Logout Successfully !!')
            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl lg:px-3 mt-4 box-border">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className='navbar-end'>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div>
                    {
                        user ?
                            <button onClick={handleLogout} className='btn-sm md:btn-md btn rounded-lg'>Logout</button> :
                            <Link to={'/login'} className='btn rounded-lg'>Sign In</Link>
                    }
                    <Link to={'/be-a-rider'} className='btn-sm md:btn-md btn btn-primary text-secondary lg:ml-3 rounded-lg'>Be A Rider</Link>
                </div>
            </div>

        </div>
    );
};

export default Navbar;