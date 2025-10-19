import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import userImg from '../assets/pictures/user.png'
import { AuthContext } from './../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext)

    const handleLogout = () => {
        userSignOut()
            .then(() => { toast("You have been loged out.") })
            .catch(err => toast(err.code))
    }

    return (
        <div className='container mx-auto flex justify-between items-center'>
            <div>{user && user.email}</div>
            <div className='space-x-4 text-black/60 nav-class'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About</NavLink>
                <NavLink to={'/career'}>Career</NavLink>
            </div>
            <div className='flex items-center gap-2'>
                <img src={userImg} alt="user image" />
                {
                    user ?
                        <button onClick={handleLogout} className='btn bg-gray-500 text-white px-8'>Log out</button> :
                        <Link to={'/auth/login'} className='btn bg-gray-700 text-white px-8'>Log in</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;