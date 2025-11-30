import React from 'react';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div className='w-11/12 mx-auto flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

            <Toaster />
        </div>
    );
};

export default Root;