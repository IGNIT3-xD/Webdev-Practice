import React from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { addBook } from '../Utility/Read';
import { addWishlist } from '../Utility/Wishlist';

const BookDetails = () => {
    const { bookId } = useParams()
    const id = parseInt(bookId)

    const bookData = useLoaderData()
    const book = bookData.find(bk => bk.bookId === id)
    // console.log(book);

    const navigate = useNavigate();

    const handleRead = (id) => {
        addBook(id);
    }

    const handleWishlist = id => {
        addWishlist(id);
    }

    return (
        <div className='mt-24 mb-5 flex flex-col text-left md:flex-row justify-around gap-10'>
            <figure className='p-10 rounded-md bg-black/5 md:w-1/2 grid place-content-center'>
                <img className='rounded-md w-[300px] object-cover' src={book.image} alt="" />
            </figure>
            <div className='md:w-1/2'>
                <div className="flex w-full flex-col">
                    <div>
                        <h1 className='text-4xl font-bold'>{book.bookName}</h1>
                        <p className='mt-2 text-xl'>By: {book.author}</p>
                    </div>
                    <div className="divider"></div>
                    <p>{book.category}</p>
                    <div className="divider"></div>
                    <div>
                        <p className='text-black/70'><span className='font-bold text-black'>Review: </span>{book.review}</p>
                        <div className='flex gap-4 items-center mt-4'>
                            <p className='font-bold'>Tags</p>
                            {
                                <div className='flex items-center gap-4'>
                                    {
                                        book.tags.map((tag, i) => <p key={i} className='bg-[#22be0a23] text-[#23BE0A] py-1 px-2 rounded-full'>#{tag}</p>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className='space-y-2'>
                        <p className='font-bold'><span className='mr-4 font-normal text-black/80'>Number of Pages: </span>{book.totalPages}</p>
                        <p className='font-bold'><span className='mr-4 font-normal text-black/80'>Publisher: </span>{book.publisher}</p>
                        <p className='font-bold'><span className='mr-4 font-normal text-black/80'>Year of Publish: </span>{book.yearOfPublishing}</p>
                        <p className='font-bold'><span className='mr-4 font-normal text-black/80'>Rating: </span>{book.rating}</p>
                    </div>
                    <div className='space-x-4 mt-5'>
                        <button onClick={() => handleRead(book.bookId)} className='btn'>Read</button>
                        <button onClick={() => handleWishlist(book.bookId)} className='btn btn-success'>Wishlist</button>
                        <button onClick={() => navigate(-1)} className='btn'>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;