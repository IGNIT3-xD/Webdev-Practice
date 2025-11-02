import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()
    // console.log(location);

    if (loading) {
        return <p className='text-2xl font-bold text-center my-20'>Loading...</p>
    }

    if (user) {
        return children
    }

    return (
        <Navigate state={location?.pathname} to={'/login'}></Navigate>
    );
};

export default PrivateRoute;