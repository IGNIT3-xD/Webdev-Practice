import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router';

const Books = ({ book }) => {
    const { bookId, author, bookName, category, image, publisher, rating, tags } = book

    return (
        <Link to={`/book/${bookId}`}>
            <div className='border border-black/10 p-3 rounded-lg'>
                <figure className='p-4 bg-black/5 h-60 rounded-lg'>
                    <img className='h-full object-cover mx-auto rounded-sm' src={image} alt="" />
                </figure>
                <div className='flex items-center gap-4 mt-4 mb-3'>
                    {
                        tags.map((tag, i) => <p key={i} className='bg-[#22be0a23] text-[#23BE0A] py-1 px-2 rounded-full'>{tag}</p>)
                    }
                </div>

                <div className="flex w-full flex-col">
                    <div className='space-y-1'>
                        <h1 className='text-xl md:text-2xl font-bold'>{bookName}</h1>
                        <p className='mt-2'>By: <span className='font-medium'>{author}</span></p>
                        <p>Publisher: <span className='font-medium'>{publisher}</span></p>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <div className='flex justify-between items-center font-medium mb-2'>
                            <p>{category}</p>
                            <div className='flex gap-3'>
                                <p>{rating}</p><Star />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Books;