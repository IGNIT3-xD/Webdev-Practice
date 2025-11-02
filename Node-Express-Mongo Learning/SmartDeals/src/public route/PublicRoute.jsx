import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)

    if (loading)
        return <p className='text-2xl font-bold my-20 text-center'>Loading...</p>

    if (user)
        return <Navigate to={'/'}></Navigate>

    return children;
};

export default PublicRoute;