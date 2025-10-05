import React from 'react';
import Banner from '../assets/resources/banner.png'

const Hero = () => {
    return (
        <div className='bg-[#1313130c] mt-20 flex flex-col-reverse p-5 text-center md:flex-row md:text-left md:justify-around md:items-center md:p-8 rounded-md'>
            <div className='space-y-8 mt-5 md:mt-0'>
                <p className='text-4xl lg:text-5xl font-bold'>Books to freshen up <br className='hidden md:block' /> your bookshelf</p>
                <button className='btn btn-warning text-white'>View The List</button>
            </div>
            <figure>
                <img className='w-60 md:w-full mx-auto' src={Banner} alt="" />
            </figure>
        </div>
    );
};

export default Hero;