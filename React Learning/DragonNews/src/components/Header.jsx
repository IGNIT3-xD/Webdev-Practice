import React from 'react';
import logo from '../assets/pictures/logo.png'
import { format } from 'date-fns';
import Bulletine from './Bulletine';

const Header = () => {
    return (
        <>
            <div className='container mx-auto mt-5 flex flex-col items-center'>
                <img src={logo} alt="logo" />
                <p className='my-2 font-medium text-black/60'>Journalism Without Fear or Favour</p>
                <p className='text-black/60'>{format(new Date(), "EEEE, LLLL dd, uuuu")}</p>
            </div>
            <Bulletine></Bulletine>
        </>
    );
};

export default Header;