import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CompletedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['parcels', user.email, 'Parcel-Delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=Parcel-Delivered`)
            return res.data
        }
    })

    if (isLoading) return <p className='text-center text-2xl font-medium my-10'>Loading...</p>

    // console.log(data);

    const calculateAmount = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.price * 0.8
        }
        else {
            return parcel.price * 0.6
        }
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Completed Deliveries ({data.length})</h1>
            <div className="mt-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Sender Email</th>
                            <th>Receiver Email</th>
                            <th>Price</th>
                            <th>Receiver Region</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.senderEmail}</td>
                                    <td>{parcel.receiverEmail}</td>
                                    <td>{parcel.price}</td>
                                    <td>{parcel.receiverRegion}</td>
                                    <td>{parcel.receiverDistrict}</td>
                                    <td>{parcel.status}</td>
                                    <td>{calculateAmount(parcel)}</td>
                                    <td className='space-x-2'>
                                        <button className='btn btn-primary text-black btn-xs'>Cashout</button>
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

export default CompletedDeliveries;