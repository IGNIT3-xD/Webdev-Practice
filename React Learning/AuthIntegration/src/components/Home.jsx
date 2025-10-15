import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <h1 className='text-2xl font-bold text-center my-10'>{user ? 'Home sweet home !!!' : 'Home'}</h1>
        </div>
    );
};

export default Home;