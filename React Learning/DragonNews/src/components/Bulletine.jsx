import React from 'react';
import Marquee from "react-fast-marquee";
import { AuthContext } from './../context/AuthContext';
import { use } from 'react';

const Bulletine = () => {
    const { bulletine } = use(AuthContext)

    return (
        <div className='flex items-center bg-black/5 p-2 my-5 container mx-auto'>
            <p className='px-3 py-2 bg-red-500 text-white'>Latest</p>
            <Marquee pauseOnHover={true} speed={80}>
                <div className='flex gap-10 items-center'>
                    {
                        bulletine.map(data => <p key={data.id}>{data.title}</p>)
                    }
                </div>
            </Marquee>
        </div>
    );
};

export default Bulletine;