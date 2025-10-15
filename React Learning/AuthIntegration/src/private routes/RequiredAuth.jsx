import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router'

const RequiredAuth = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location);

    if (loading) {
        return <span className="loading loading-spinner text-primary w-16 grid place-self-center my-30"></span>
    }

    if (user) return children;
    return <Navigate state={location?.pathname} to='/login'></Navigate>;
};

export default RequiredAuth;