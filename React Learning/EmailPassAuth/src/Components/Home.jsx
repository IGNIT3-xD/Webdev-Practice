import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './../firebase.init';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                alert("You have been signed out !!");
                navigate('/');
            })
    }

    return (
        <div>
            <nav className='bg-blue-400/50 p-4 rounded-sm flex items-center justify-between w-11/12 mx-auto mt-2'>
                <p className='text-xl font-bold'>Home</p>
                <button onClick={handleSignOut} className='btn'>Sign Out</button>
            </nav>
        </div>
    );
};

export default Home;