import React, { useState } from 'react';
import useData from '../Components/useData';
import { useNavigate } from 'react-router';

const Products = () => {
    const { data } = useData()
    const [search, setSearch] = useState('')
    const naviagte = useNavigate();

    const handleSearch = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value)
    }

    const validateSearch = search.trim().toLowerCase();
    const searchProducts = validateSearch ?
        data.filter(product => product.name.toLowerCase().includes(validateSearch)) : data;

    return (
        <div className='my-5'>
            <div className='flex items-center justify-between '>
                <h1 className='text-2xl font-bold'>All Products <span className='text-sm text-black/50'>({searchProducts.length})</span></h1>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={handleSearch} type="search" placeholder="Search" />
                </label>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'>
                {
                    searchProducts.map(product =>
                        <div key={product.id} className="card bg-base-100 h-96 shadow-sm hover:scale-105 transition ease-in-out duration-200">
                            <figure>
                                <img className='object-cover' src={product.image} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => { naviagte(`/product/${product.id}`) }} className="btn btn-primary">View Details</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Products;