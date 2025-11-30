import React from 'react';
import img1 from '../../../assets/Images/assets/live-tracking.png'
import img2 from '../../../assets/Images/assets/safe-delivery.png'
import img3 from '../../../assets/Images/assets/tiny-deliveryman.png'

const Track = () => {
    const features = [
        {
            title: "Live Parcel Tracking",
            text: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
            img: img1,
        },
        {
            title: "100% Safe Delivery",
            text: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            img: img2,
        },
        {
            title: "24/7 Call Center Support",
            text: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            img: img3,
        },
    ];

    return (
        <section className="w-11/12 mx-auto py-10 my-10">
            <div className="flex flex-col gap-8 border-t border-b border-dashed py-10">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center flex-col md:flex-row gap-6 bg-white shadow-sm rounded-xl p-6 md:p-8"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-40 h-auto object-contain md:border-r border-r-gray-500 border-dashed pr-8"
                        />
                        <div className='text-center md:text-left'>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Track;