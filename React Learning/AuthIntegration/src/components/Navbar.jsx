import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext)
    // console.log(user);

    const links = <>

        <li><NavLink to={'/'}>Home</NavLink></li>

        {
            user ?
                <>
                    <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    <li><NavLink to={'/profile'}>Profile</NavLink></li>
                </> :
                <>

                    <li><NavLink to={'/login'}>Login</NavLink></li>
                    <li><NavLink to={'/registration'}>Registration</NavLink></li>
                </>
        }

        <li><NavLink to={'/reviews'}>Reviews</NavLink></li>
    </>

    const handleSignOut = () => {
        userSignOut()
            .then(() => { })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="navbar bg-white/90 text-black shadow-sm px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="font-bold text-blue-500 text-xl">Authy Auth!!</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleSignOut} className="btn btn-primary">Sign Out</a> : <Link to={'/login'} className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;