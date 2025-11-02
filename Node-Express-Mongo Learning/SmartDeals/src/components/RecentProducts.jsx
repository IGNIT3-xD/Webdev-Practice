import React from 'react';
import productImg from '../assets/images/thumbnail-card.png';
import { Link } from 'react-router';

const RecentProducts = ({ product }) => {
    // console.log(product);

    return (
        <div className='p-4 shadow-md rounded-sm'>
            <figure>
                <img className='mx-auto' src={productImg} alt="product image" />
            </figure>
            <div className='space-y-3'>
                <p className='font-bold text-xl mt-3'>{product.title}</p>
                <p className='font-medium text-primary'>${product.price_min} - ${product.price_max}</p>
                <Link to={`/products/${product._id}`} className='btn w-full border-primary bg-white text-primary hover:bg-gray-400/10 hover:shadow-xl'>Views Details</Link>
            </div>
        </div>
    );
};

export default RecentProducts;