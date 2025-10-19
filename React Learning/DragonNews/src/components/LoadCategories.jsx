import React, { use } from 'react';
import { NavLink } from 'react-router';

const LoadCategories = ({ categoriesPromise }) => {
    const categories = use(categoriesPromise)
    // console.log(categories);

    return (
        <div className='flex flex-col gap-4 mt-4 categories-nav'>
            {
                categories.map(data => <NavLink to={`/category/${data.id}`} className={'p-2 rounded-md text-black/60'} key={data.id}>{data.name}</NavLink>)
            }
        </div>
    );
};

export default LoadCategories;