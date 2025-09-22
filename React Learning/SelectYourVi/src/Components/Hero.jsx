import React from 'react';
import Bg from '../resources/assets/bg-shadow.png'
import HeroLogo from '../resources/assets/hero.png'

const Hero = () => {
    return (
        <div className='bg-[#0e0b0b] w-11/12 mx-auto rounded-xl flex flex-col items-center gap-4 p-10 text-white'
            style={{ backgroundImage: `url(${Bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >

            <img className='w-40' src={HeroLogo} alt="" />
            <p className='text-2xl font-bold'>Assemble Your Ultimate 6a Side Football Team</p>
            <p className=''>Beyond Goals Beyond Limits</p>
            <div className='p-1 border border-yellow-300 rounded-xl'>
                <button className='btn bg-yellow-300 rounded-xl'>Claim Free Credits</button>
            </div>
        </div >
    );
};

export default Hero;