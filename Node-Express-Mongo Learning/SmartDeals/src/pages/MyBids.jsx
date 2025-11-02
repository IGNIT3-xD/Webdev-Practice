import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { AuthContext } from './../contexts/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext)
    const [myBid, setMyBid] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/bids?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyBid(data)
                })
        }
    }, [user?.email])

    const handleRemove = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bids/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            const remainingData = myBid.filter(bid => bid._id !== id)
                            setMyBid(remainingData)
                        }
                    })


            }
        });
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>My Bids: <span className='text-primary'>{myBid.length}</span></h1>
            <table className="table my-10">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL No.</th>
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Bid Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myBid.map((bid, i) =>
                            <tr key={bid._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bid.buyer_email}
                                </td>
                                <td className='font-bold'>${bid.bid_price}</td>
                                <td className='my-6 badge badge-warning'>{bid.status}</td>
                                <td>
                                    <button onClick={() => handleRemove(bid._id)} className='btn btn-xs text-green-600 outline outline-amber-500'>Remove</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBids;