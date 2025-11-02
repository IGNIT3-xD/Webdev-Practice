import React from 'react';
import { useLoaderData } from 'react-router';
import AllProductsComp from './../components/AllProductsComp';

const AllProducts = () => {
    const allProducts = useLoaderData()
    return (
        <div>
            <p className='text-4xl font-bold text-center'>Recent <span className='text-primary'>Products</span></p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10'>
                {
                    allProducts.map(product => <AllProductsComp key={product._id} product={product}></AllProductsComp>)
                }
            </div>
        </div>
    );
};

export default AllProducts;