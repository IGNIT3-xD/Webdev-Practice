import React from 'react';
import { useNavigate } from 'react-router';

const ProductsCard = ({ product }) => {
    // console.log(product);
    const navigate = useNavigate()

    return (
        <div className="card bg-base-100 h-96 shadow-sm hover:scale-105 transition ease-in-out duration-200">
            <figure>
                <img className='object-cover' src={product.image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/product/${product.id}`)} className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;