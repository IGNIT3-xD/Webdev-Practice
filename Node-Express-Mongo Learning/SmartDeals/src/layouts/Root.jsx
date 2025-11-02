import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='flex h-screen flex-col'>
            <Navbar></Navbar>
            <div className='container my-10 mx-auto flex-1'>
                <Outlet></Outlet>
            </div>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;