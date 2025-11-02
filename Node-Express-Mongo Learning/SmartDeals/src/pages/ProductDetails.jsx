import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import img from '../assets/images/thumbnail-details.png'
import img2 from '../assets/images/thumbnail-row.png'
import { AuthContext } from './../contexts/AuthContext';
import Swal from 'sweetalert2'

const ProductDetails = () => {
    const productDetails = useLoaderData()
    const navigate = useNavigate()
    const modalRef = useRef(null)
    const { user } = use(AuthContext)
    const [bidsData, setBidsdata] = useState([])
    const { _id, condition, usage, description, title, category, price_min, price_max, created_at, seller_name, location, seller_contact, status } = productDetails

    useEffect(() => {
        fetch(`http://localhost:5000/products/bids/${_id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setBidsdata(data)
            })
    }, [_id])

    const handleModal = () => {
        modalRef.current.showModal()
    }

    const handleSubmitBid = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        // console.log(_id, name, email, bid);

        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            status: 'pending'
        }

        fetch('http://localhost:5000/bids', {
            method: "POST",
            headers: { "content-type": "Application/json" },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                // console.log("After placing bid ", data);
                if (data.insertedId) {
                    modalRef.current.close()

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    newBid._id = data.insertedId
                    setBidsdata([...bidsData, newBid].sort((a, b) => b.bid_price - a.bid_price))
                }
            })
    }

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
                fetch(`http://localhost:5000/bids/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                            const remainingData = bidsData.filter(data => data._id !== id)
                            setBidsdata(remainingData)
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row mb-10 gap-4'>
                <div className='shadow-sm flex-1'>
                    <figure className='p-2 shadow-sm'>
                        <img className='w-96 mx-auto' src={img} alt="" />
                    </figure>
                    <div className='shadow-sm bg-white/70 p-2 space-y-2'>
                        <p className='font-medium text-xl'>Product Description</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-primary'>Condition : {condition}</p>
                            <p className='text-primary'>{usage}</p>
                        </div>
                        <div className='divider'></div>
                        <p>{description}</p>
                    </div>
                </div>
                <div className='space-y-4 flex-1'>
                    <p onClick={() => navigate(-1)} className='text-black/70 cursor-pointer hover:underline mt-2'>← Go Back</p>
                    <h1 className='text-3xl font-bold'>{title}</h1>
                    <p className='badge bg-blue-300/50 text-primary'>{category}</p>
                    <div className='p-2 shadow-sm space-y-2'>
                        <p className='font-bold text-xl text-green-600'>${price_min} - {price_max}</p>
                        <p className='text-black/70'>Price Starts From</p>
                    </div>
                    <div className='shadow-sm p-2 space-y-2'>
                        <p className='text-xl font-medium'>Product Information</p>
                        <p className='font-medium'>Product id: <span className='text-black/60'>{_id}</span></p>
                        <p className='font-medium'>Posted on: <span className='text-black/60'>{created_at}</span></p>
                    </div>
                    <div className='space-y-2 p-2 shadow-sm'>
                        <p className='text-xl font-medium'>Seller Information</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-10 rounded-field' src={img2} alt="" />
                            <p>{seller_name}</p>
                        </div>
                        <p className='font-medium'>Contact: <span className='text-black/60'>{seller_contact}</span></p>
                        <p className='font-medium'>Location: <span className='text-black/60'>{location}</span></p>
                        <p className='font-medium'>Status: <span className='text-black/60 badge badge-success'>{status}</span></p>
                    </div>
                    <div>
                        <button onClick={handleModal} className='text-white btn btn-primary w-full'>I want to buy this product</button>

                        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-xl text-center">Give Seller Your Offer Price!</h3>
                                <form onSubmit={handleSubmitBid} className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' defaultValue={user.displayName} readOnly className="input text-black/60" />
                                    <label className="label">Email</label>
                                    <input type="email" name='email' defaultValue={user.email} readOnly className="input text-black/60" />
                                    <label className="label">Bid</label>
                                    <input type="number" required name='bid' placeholder='Your Bid' className="input " />
                                    <button className="btn btn-primary mt-4">Submit Bid</button>
                                </form>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            <p className='text-3xl font-bold'>Bids For The Product: <span className='text-primary'>{bidsData.length}</span></p>
            <div className='my-8'>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Bid Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bidsData.map((bid, i) =>
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
                                    <td>
                                        <button onClick={() => handleRemove(bid._id)} disabled={bid.buyer_email !== user.email} className='btn btn-xs text-green-600 outline outline-amber-500'>Remove</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetails;