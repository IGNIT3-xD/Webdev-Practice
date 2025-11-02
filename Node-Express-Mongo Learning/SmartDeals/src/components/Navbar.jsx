import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout, setUser } = useContext(AuthContext)

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-products'}>All Products</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/my-products'}>My Products</NavLink></li>
                <li><NavLink to={'/my-bids'}>My Bids</NavLink></li>
                <li><NavLink to={'/create-products'}>Create Products</NavLink></li>
            </>
        }
    </>

    const handleLogout = () => {
        logout()
            .then(() => {
                setUser(null)
                toast.success("Logged Out Successfull!!")
            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div className="navbar md:px-8 w-11/12 lg:w-3/4 mx-auto mt-6 rounded-full shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <p className='text-xl md:text-2xl font-bold'>Smart<span className='text-primary'>Deals</span></p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {links}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                {
                    !user ?
                        <><Link to={'/login'} className='btn btn-sm md:btn-md text-primary border-primary'>Login</Link>
                            <Link to={'/register'} className='btn btn-sm md:btn-md btn-primary'>Register</Link> </> :
                        <>
                            <p className='font-bold text-black/70'>{user.displayName}</p>
                            <button onClick={handleLogout} className='btn btn-sm md:btn-md text-primary border-primary'>Logout</button>
                        </>}
            </div>
        </div>
    );
};

export default Navbar;