import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdEditDocument } from "react-icons/md";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });

                            refetch()
                        }
                    })
            }
        });
    }

    const handlePayment = async (parcel) => {
        // console.log(parcel);
        const paymentInfo = {
            price: parcel.price,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            parcelId: parcel._id
        }
        // console.log(paymentInfo);
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        // console.log(res.data);
        window.location.assign(res.data.url)
    }

    if (isLoading) return <p className='my-10 text-center font-bold text-4xl'>Loading...</p>
    if (isError) return <p className='my-10 text-center font-bold text-4xl'>Error Happend</p>

    return (
        <div>
            <h1 className='font-bold text-2xl'>My Parcels ({data?.length})</h1>

            <div className="overflow-x-auto mt-6 rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        data.map((parcel, i) => <tbody key={parcel._id}>
                            <tr>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.price}</td>
                                <td>{parcel.status === 'Paid' ?
                                    <span className='text-green-500'>Paid</span> :
                                    <button onClick={() => handlePayment(parcel)} className='btn btn-primary text-secondary btn-sm'>Pay Now</button>}
                                </td>
                                <td>
                                    <Link to={`/track-a-parcel/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                                </td>
                                <td>
                                    {parcel.deliveryStatus ? parcel.deliveryStatus : '----'}
                                </td>
                                <td>
                                    <button title='Edit' className='btn btn-square hover:btn-primary'><MdEditDocument /></button>
                                    <button title='View' className='mx-2 btn btn-square hover:btn-primary'><FaMagnifyingGlassChart /></button>
                                    <button onClick={() => handleDelete(parcel._id)} title='Delete' className='btn btn-square hover:btn-primary'><FaTrashAlt /></button>
                                </td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default MyParcels;