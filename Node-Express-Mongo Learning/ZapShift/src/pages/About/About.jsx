import React from 'react';
import { Outlet } from 'react-router';
import AbNavbar from './components/AbNavbar';

const About = () => {
    return (
        <div className='p-8 md:p-10 bg-white my-10 rounded-2xl'>
            <h1 className='text-secondary font-bold text-2xl md:text-4xl mb-2'>About Us</h1>
            <p className='text-sm font-light text-[#606060]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. <br /> From personal packages to business shipments — we deliver on time, every time.</p>
            <div className='mt-10'>
                <AbNavbar></AbNavbar>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default About;