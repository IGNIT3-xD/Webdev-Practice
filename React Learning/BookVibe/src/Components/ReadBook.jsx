import React from 'react';
import { useNavigate } from 'react-router';

const ReadBook = ({ book }) => {
    // console.log(book);
    const navigate = useNavigate()
    return (
        <div className='border border-black/10 p-2 flex gap-10 rounded-md'>
            <figure className='p-2 bg-black/10 rounded-md'>
                <img className='w-28 rounded-md' src={book.image} alt="" />
            </figure>
            <div>
                <h1 className='text-xl font-bold'>{book.bookName}</h1>
                <p>By: {book.author}</p>
                <div className="divider"></div>
                <p className='font-medium text-green-500'>Category: {book.category}</p>
                <p className='font-medium text-green-500 my-2'>Rating: {book.rating}</p>
                <button onClick={() => navigate(`/book/${book.bookId}`)} className='btn btn-success'>View Details</button>
            </div>
        </div>
    );
};

export default ReadBook;