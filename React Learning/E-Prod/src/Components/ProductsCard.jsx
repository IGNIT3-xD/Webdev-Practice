import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductsCard = ({ data, cartProduct, setCartProducts }) => {
    const { img, name, quality_description, rating, price } = data;
    const productPrice = parseFloat(price.replace(/[^0-9.]/g, ""))

    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(productPrice)

    useEffect(() => {
        setTotalPrice(productPrice * quantity)
    }, [quantity, productPrice])

    const handleQuantityPlus = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const habdleQuantityMinus = () => {
        if (quantity <= 1) {
            return;
        }

        setQuantity((prevQuantity => prevQuantity - 1))
    }

    const handleBuy = () => {

        const isExist = cartProduct.find((product) => product.name === data.name)
        if (isExist) {
            toast("The product is already in your cart")
            const updateCart = cartProduct.map(product =>
                product.name === data.name ? { ...product, quantity: product.quantity + quantity } : product
            )
            setCartProducts(updateCart)
        }
        else {
            alert("Product is added to the cart")
            const newProduct = { ...data, quantity: quantity };
            setCartProducts([...cartProduct, newProduct]);
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-lg">
            <figure>
                <img className='h-60 object-contain w-full' src={img} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{quality_description}</p>
                <p className='font-medium'>Rating: {rating}</p>
                <p className='font-bold text-xl'>Price: ${totalPrice}</p>
                <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center gap-4'>
                        <button onClick={habdleQuantityMinus} className='btn'>-</button>
                        <p className='text-xl font-bold'>{quantity}</p>
                        <button onClick={handleQuantityPlus} className='btn'>+</button>
                    </div>
                    <div className="">
                        <button onClick={handleBuy} className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;