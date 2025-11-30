import React from 'react';
import useAuth from './../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PublicRoute = ({ children }) => {
    const { user } = useAuth()
    const location = useLocation();

    if (user) {
        return <Navigate to={location?.state || '/'}></Navigate>
    }

    return (
        children
    );
};

export default PublicRoute;