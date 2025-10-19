import React, { use } from 'react';
import Navbar from './../components/Navbar';
import { Navigate, Outlet, useNavigation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const AuthLayout = () => {
    const { user } = use(AuthContext)
    const { state } = useNavigation();

    if (user) {
        return <Navigate to={'/'}></Navigate>
    }

    return (
        <div className='container mx-auto my-5'>
            <Navbar></Navbar>
            <div>
                {
                    state === "loading" ? <Loading></Loading> : <Outlet></Outlet>
                }
            </div>

            <ToastContainer />
        </div>
    );
};

export default AuthLayout;