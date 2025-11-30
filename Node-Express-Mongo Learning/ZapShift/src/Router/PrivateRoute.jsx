import React from 'react';
import useAuth from './../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <p className='my-10 text-center font-bold text-4xl'>Loading...</p>
    }

    if (!user) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return (
        children
    );
};

export default PrivateRoute;