import React from 'react';
import { FiBriefcase, FiDollarSign, FiPackage, FiTruck } from 'react-icons/fi';

const Works = () => {
    const steps = [
        {
            icon: <FiPackage className="text-4xl text-teal-700" />,
            title: "Booking Pick & Drop",
            desc: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            icon: <FiDollarSign className="text-4xl text-teal-700" />,
            title: "Cash On Delivery",
            desc: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            icon: <FiTruck className="text-4xl text-teal-700" />,
            title: "Delivery Hub",
            desc: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            icon: <FiBriefcase className="text-4xl text-teal-700" />,
            title: "Booking SME & Corporate",
            desc: "From personal packages to business shipments — we deliver on time, every time."
        },
    ]

    return (
        <section>
            <div className="my-10 px-6">
                <h2 className="text-2xl font-bold text-secondary mb-4">How it Works</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-sm rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Works;