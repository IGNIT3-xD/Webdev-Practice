import React from 'react';
import { FaShippingFast, FaBoxOpen } from 'react-icons/fa';
import { useLoaderData } from 'react-router';

const OurServices = () => {
    const servies = useLoaderData()

    return (
        <div className='my-10 bg-secondary py-12 rounded-xl'>
            <div className='text-center text-white px-6'>
                <h1 className='text-2xl font-bold'>Our Services</h1>
                <p className='lg:w-1/2 mx-auto mt-2 text-[#DADADA]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                {
                    servies.map(service =>
                        <div key={service.title} className='p-6 bg-white rounded-2xl space-y-2 text-center hover:bg-primary transition duration-300 ease-in-out'>
                            <div className='w-10 h-10 mx-auto border p-2 rounded-full border-gray-500'>
                                <FaShippingFast className='text-xl mx-auto text-gray-600' />
                            </div>
                            <p className='text-secondary font-bold text-xl'>{service.title}</p>
                            <p className='text-[#606060]'>{service.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default OurServices;