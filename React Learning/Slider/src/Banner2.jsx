import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/mousewheel';

const Banner2 = () => {
    return (
        <Swiper className='m-8'
            modules={[Navigation, Pagination, A11y, Autoplay, EffectFade, Mousewheel]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            effect='fade'
            mousewheel
        >
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover mx-auto' src="https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover mx-auto' src="https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover mx-auto' src="https://images.pexels.com/photos/96627/pexels-photo-96627.jpeg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='h-[400px] w-full object-cover mx-auto' src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner2;