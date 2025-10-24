import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const Banner = () => {
    return (
        <Swiper className='border m-7'
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <img src="https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;