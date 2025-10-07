import React from 'react';
import useData from '../Components/useData';
import { Link } from 'react-router';
import ProductsCard from '../Components/ProductsCard';

const Home = () => {
    const { data, loading } = useData()
    // console.log(data);
    const featuredProducts = data.slice(0, 6)
    // console.log(featuredProducts);

    if (loading) {
        return <p className='text-2xl text-center my-20 font-bold'>Loading...</p>
    }

    return (
        <div className='my-5'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl'>Featured Products</h1>
                <Link to={'/products'} className='text-blue-500 font-medium underline'>See All Products</Link>
            </div>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    featuredProducts.map(product => <ProductsCard key={product.id} product={product}></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default Home;