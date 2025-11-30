import React, { use } from 'react';
import img from '../../../assets/Images/assets/safe-delivery.png'
import { FaQuoteLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const Feedback = ({ reviwsPromise }) => {
    const reviews = use(reviwsPromise)
    // console.log(reviews);
    
    return (
        <div className='my-10'>
            <div className='text-center flex flex-col items-center justify-center gap-4'>
                <img src={img} alt="" />
                <h1 className='text-2xl font-bold text-secondary'>What our customers are sayings</h1>
                <p className='text-gray-500 text-sm lg:w-[60%] mx-auto'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            {
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    loop={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 1.5,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mt-6"
                >
                    {
                        reviews.map(review =>
                            <SwiperSlide>
                                <div className="max-w-sm bg-white rounded-xl shadow-md p-6 mt-10 mx-auto">
                                    <FaQuoteLeft className="text-gray-400 text-3xl mb-4" />
                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {review.review}
                                    </p>
                                    <div className="border-t border-dashed border-gray-300 mb-4"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-teal-700 rounded-full">
                                            <img className='rounded-full object-cover w-full' src={review.user_photoURL} alt="" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                                            <p className="text-sm text-gray-500">{review.user_email}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            }
        </div>
    );
};

export default Feedback;