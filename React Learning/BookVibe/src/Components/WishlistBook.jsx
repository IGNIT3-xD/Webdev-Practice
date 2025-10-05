import React from 'react';

const WishlistBook = ({ book }) => {
    return (
        <div className='border border-black/10 p-2 flex items-center gap-10 rounded-md'>
            <figure className='p-2 bg-black/10 rounded-md'>
                <img className='w-28 rounded-md' src={book.image} alt="" />
            </figure>
            <div>
                <h1 className='text-xl font-bold'>{book.bookName}</h1>
                <p>By: {book.author}</p>
                <p className='font-medium text-green-500'>Category: {book.category}</p>
                <p className='font-medium text-green-500 my-2'>Rating: {book.rating}</p>
            </div>
        </div>
    );
};

export default WishlistBook;