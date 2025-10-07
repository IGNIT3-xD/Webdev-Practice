import React from 'react';
import { removeWishlist } from '../Utilities/Wishlist';

const WishlistCards = ({ product, onRemove }) => {
    // console.log(product);

    const handleRemove = () => {
        removeWishlist(product.id)
        onRemove(product.id)
    }

    return (
        <div className='mt-5 bg-black/5 p-4 rounded-md flex justify-between items-center'>
            <div className='flex gap-5'>
                <figure className='w-28'>
                    <img src={product.image} alt="" />
                </figure>
                <div className='flex flex-col justify-center gap-5'>
                    <p className='text-xl font-bold'>{product.name}</p>
                    <p className='font-bold text-black/50'>{product.category}</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <p className='font-bold'>Price: {product.price}$</p>
                <button onClick={handleRemove} className='btn btn-outline'>Remove</button>
            </div>
        </div>
    );
};

export default WishlistCards;