import React from 'react';
import { Suspense } from 'react';
import RecentProducts from '../components/RecentProducts';
import { useLoaderData } from 'react-router';

// const productPromise = fetch('http://localhost:5000/recent-products').then(res => res.json)

const Home = () => {
    const recentProducts = useLoaderData()
    // console.log(recentProducts);

    return (
        <div>
            <p className='text-4xl font-bold text-center'>Recent <span className='text-primary'>Products</span></p>
            {/* <Suspense fallback={<p className='text-primary text-2xl font-bold text-center'>Loading...</p>}>
                <RecentProducts productPromise={productPromise}></RecentProducts>
            </Suspense> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10'>
                {
                    recentProducts.map(product => <RecentProducts key={product._id} product={product}></RecentProducts>)
                }
            </div>
        </div>
    );
};

export default Home;