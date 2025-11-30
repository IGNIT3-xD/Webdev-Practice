import React from 'react';
import location from '../../../assets/Images/assets/location-merchant.png';

const MarchentBanner = () => {
    return (
        <div className={`my-10 w-11/12 mx-auto bg-secondary p-8 flex flex-col-reverse md:flex-row gap-5 text-center md:text-left items-center justify-around rounded-xl merchant-bg`}>
            <div className='text-white space-y-4 flex-1'>
                <h1 className='text-xl lg:text-3xl font-bold'>Merchant and Customer Satisfaction is Our First Priority</h1>
                <p className='text-[#DADADA] font-light text-sm lg:text-[16px]'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='space-y-4 lg:space-y-0 md:space-x-4'>
                    <button className='btn btn-primary text-secondary rounded-full'>Become a Merchent</button>
                    <button className='btn btn-outline outline-primary text-primary rounded-full'>Earn with ZapShift courier</button>
                </div>
            </div>
            <div className='flex-1'>
                <img src={location} alt="" />
            </div>
        </div>
    );
};

export default MarchentBanner;