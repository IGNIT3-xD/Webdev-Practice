import React from 'react';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';
// import axios from 'axios';
import { useState } from 'react';
import { useAxios } from './../hooks/useAxios';

const MyProducts = () => {
    const { user } = use(AuthContext)
    const [myProduct, setMyProduct] = useState([])
    const instance = useAxios()

    useEffect(() => {
        if (user?.email) {
            instance.get(`/products?email=${user.email}`)
                .then(res => {
                    // console.log(res.data);
                    setMyProduct(res.data)
                })
        }
    }, [user, instance])

    const removeProduct = (id) => {
        console.log(id);
        instance.delete(`/products/${id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.deletedCount) {
                    const remainingData = myProduct.filter(product => product._id !== id)
                    setMyProduct(remainingData)
                }
            })
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>My <span className='text-primary'>Product</span></h1>

            <table className="table my-10">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myProduct.map((bid, i) =>
                            <tr key={bid._id}>
                                <th>{i + 1}</th>
                                <th>{bid.title}</th>
                                <th>{bid.email}</th>
                                <th><button onClick={() => removeProduct(bid._id)} className='btn btn-success'>Remove</button></th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;