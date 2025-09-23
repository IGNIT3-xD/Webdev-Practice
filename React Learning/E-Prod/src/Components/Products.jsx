import React from 'react';
import ProductsCard from './ProductsCard';

const Products = ({ data, cartProduct, setCartProducts }) => {
    return (
        <div className='w-11/12 mx-auto my-10 grid grid-cols-1 lg:grid-cols-3 gap-10'>
            {
                data.map(data => <ProductsCard
                    key={data.id}
                    data={data}
                    cartProduct={cartProduct}
                    setCartProducts={setCartProducts}
                ></ProductsCard>)
            }
        </div>
    );
};

export default Products;