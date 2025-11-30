import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RiderRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useRole()

    if (loading || isLoading) return <p className='text-center text-2xl font-bold my-10'>Loading...</p>

    if (role !== 'Rider' || !user) {
        return <p className='text-2xl font-bold text-red-700 text-center my-10'>Forbidden Access</p>
    }

    return children
};

export default RiderRoute;