import React, { Suspense } from 'react';
import LoadCategories from './LoadCategories';

const categoriesPromise = fetch('/categories.json')
    .then(res => res.json())

const Categories = () => {
    return (
        <div className=''>
            <p className='font-bold'>All Categories</p>
            <Suspense fallback={<p>Loading....</p>}>
                <LoadCategories categoriesPromise={categoriesPromise}></LoadCategories>
            </Suspense>
        </div>
    );
};

export default Categories;