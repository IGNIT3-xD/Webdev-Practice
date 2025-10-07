import React, { useEffect, useState } from 'react';
import useData from '../Components/useData';
import { getProducts } from '../Utilities/Wishlist';
import WishlistCards from '../Components/WishlistCards';
import { BarChart } from '@mui/x-charts/BarChart';

const Wishlist = () => {

    const { data, loading } = useData()
    const [wishlist, setWishlist] = useState([])
    const [sort, setSort] = useState("")

    useEffect(() => {
        const storedProducts = getProducts();
        const products = data.filter(product => storedProducts.includes(product.id))
        setWishlist(products);
    }, [data])

    const handleSort = (type) => {
        setSort(type);

        if (type === "Low to High") {
            const lowToHigh = [...wishlist].sort((a, b) => a.price - b.price)
            setWishlist(lowToHigh);
        }

        if (type === "High to Low") {
            const highToLow = [...wishlist].sort((a, b) => b.price - a.price)
            setWishlist(highToLow)
        }
    }

    const onRemove = (id) => {
        setWishlist(prev => prev.filter(product => product.id !== id))
    }

    if (loading) {
        return <p className='text-2xl text-center my-20 font-bold'>Loading...</p>
    }

    return (
        <div className='my-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Wishlist <span className='text-sm text-black/60'>({wishlist.length})</span></h1>
                <details className="dropdown">
                    <summary className="btn m-1">Sort by Price {sort}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
                        <li onClick={() => handleSort("Low to High")}> <a>Lower -&gt; Higher</a> </li>
                        <li onClick={() => handleSort("High to Low")}> <a>Higher -&gt; Lower</a> </li>
                    </ul>
                </details>
            </div>

            <div className='space-y-8'>
                {
                    wishlist.length === 0 ? <p>No product has been added to the wishlist</p> :
                        wishlist.map(product => <WishlistCards
                            key={product.id}
                            product={product}
                            onRemove={onRemove}>
                        </WishlistCards>)
                }
            </div>

            <h1 className='text-2xl font-bold mt-5'>Chart</h1>
            <div>
                {
                    wishlist.length === 0 ? <p>No Chart Available</p> :
                        <BarChart
                            xAxis={[
                                {
                                    id: 'product',
                                    data: wishlist.map(product => product.name),
                                },
                            ]}
                            series={[
                                {
                                    data: wishlist.map(product => product.price),
                                },
                            ]}
                            height={300}
                        />
                }
            </div>
        </div>
    );
};

export default Wishlist;