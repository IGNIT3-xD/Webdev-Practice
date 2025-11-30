import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import img from '../assets/Images/assets/authImage.png'
import { Toaster } from 'react-hot-toast';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto mt-5'>
            <Logo></Logo>
            <div className='my-10 flex flex-col-reverse md:flex-row lg:w-4/5 mx-auto items-center justify-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={img} alt="auth image" />
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default AuthLayout;