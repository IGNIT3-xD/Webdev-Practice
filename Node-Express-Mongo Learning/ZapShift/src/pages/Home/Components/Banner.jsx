import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner1 from '../../../assets/Images/assets/banner/banner1.png'
import Banner2 from '../../../assets/Images/assets/banner/banner2.png'
import Banner3 from '../../../assets/Images/assets/banner/banner3.png'

import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper my-6"
        >
            <SwiperSlide>
                <img className='h-[200px] md:h-[350px] lg:h-[550px] w-full' src={Banner1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[200px] md:h-[350px] lg:h-[550px] w-full' src={Banner2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[200px] md:h-[350px] lg:h-[550px] w-full' src={Banner3} alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;