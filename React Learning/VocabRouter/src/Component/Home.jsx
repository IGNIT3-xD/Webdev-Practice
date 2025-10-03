import React from 'react';
import { Link, NavLink, useLoaderData } from 'react-router';
import LevelBtn from './LevelBtn';

const Home = () => {

    const btns = useLoaderData()
    const btnsData = btns.data;

    return (
        <div>
            <div className='flex flex-col items-center justify-center text-center my-10 gap-8'>
                <p className='text-4xl font-bold'><span className='text-[#F4991A]'>English</span> is Easy !!!</p>
                <p className='text-xl lg:w-3/4'>আজ থেকেই আপনার ভাষা শেখার যাত্রা শুরু করুন।
                    আপনি যদি নতুন হন অথবা আপনার দক্ষতা বাড়াতে চান,
                    আমাদের <span className='text-[#F4991A]'>Interactive Lessons</span> আপনাকে নিয়ে যাবে অন্য একটি Level এ
                </p>
            </div>

            <p className='text-3xl font-bold text-center mt-30'><span className='text-[#F4991A]'>Let's</span> Learn Vocabularies</p>

            <div className='flex flex-wrap gap-5 justify-center my-10'>
                {
                    btnsData.map((btn) => <LevelBtn key={btn.id} btn={btn}></LevelBtn>)
                }
            </div>

            <div className='text-center my-10 bg-gray-100 p-10 rounded-md'>
                <p className='text-xl text-black/60'>আপনি এখনো কোন Lesson Select করেননি</p>
                <p className='font-medium text-3xl mt-4'>একটি <span className='text-[#F4991A]'>Lesson Select</span> করুন।</p>
            </div>
        </div>
    );
}

export default Home;