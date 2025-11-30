import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useRole()
    // console.log(role);

    if (loading || isLoading) return <p className='text-center text-2xl font-bold my-10'>Loading...</p>

    if (role !== 'Admin' || !user) {
        return <p className='text-2xl text-red-700 font-bold text-center my-10'>Forbidden Access</p>
    }

    return children;
};

export default AdminRoute;