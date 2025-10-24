import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';

const Banner3 = () => {
    return (
        <Swiper className='my-8'
            modules={[Pagination, Autoplay]}
            autoplay
            navigation
            pagination
            slidesPerView={1}
            slidesPerGroupSkip={1}
            centeredSlides={false}
            grabCursor
            breakpoints={{
                769: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
            }}
        >
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover' src="https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover' src="https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover' src="https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover' src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner3;