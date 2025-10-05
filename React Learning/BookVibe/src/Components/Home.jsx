import React from 'react';
import Hero from './Hero';
import Books from './Books';
import { useLoaderData } from 'react-router';

const Home = () => {
    const data = useLoaderData()

    return (
        <div>
            <Hero></Hero>
            <h1 className='text-center font-bold text-3xl my-10'>Books</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    data.map(book => <Books key={book.bookId} book={book}></Books>)
                }
            </div>
        </div>
    );
};

export default Home;