import React from 'react';
import Img from '../assets/alert-error.png'
import { useNavigate } from 'react-router';

const NoWords = () => {
    const navigate = useNavigate();
    return (
        <div className='col-span-3 flex flex-col items-center justify-center gap-4 text-center'>
            <img src={Img} alt="" />
            <p className='text-xl text-black/60'>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p className='text-2xl font-medium'>নেক্সট <span className='text-[#F4991A]'>Lesson</span> এ যান</p>
            <button onClick={() => navigate(-1)} className='btn hover:bg-[#ffd901]'>Go Back</button>
        </div >
    );
};

export default NoWords;