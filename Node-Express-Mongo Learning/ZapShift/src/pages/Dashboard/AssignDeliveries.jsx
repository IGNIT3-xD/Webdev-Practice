import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['parcels', user.email, 'Driver-Assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=Driver-Assigned`)
            return res.data
        }
    })

    if (isLoading) return <p className='text-center text-2xl font-medium my-10'>Loading...</p>

    // console.log(data);

    const handleAccept = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }
        let messege = `Parcel has been ${status}`

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: messege,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Assign Deliveries ({data.length})</h1>
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
                            <th>Action</th>
                            <th>Other Action</th>
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
                                    <td className='space-x-2'>
                                        {
                                            parcel.deliveryStatus === 'Driver-Assigned' ? <>
                                                <button onClick={() => handleAccept(parcel, 'Rider-Arriving')} className='btn btn-primary text-black btn-xs'>Confirm</button>
                                                <button className='btn btn-secondary text-white btn-xs'>Reject</button>
                                            </> :
                                                <span className='text-green-600 font-medium'>Accepted</span>
                                        }
                                    </td>
                                    <td className='space-x-2'>
                                        <button onClick={() => handleAccept(parcel, 'Parcel-Picked-Up')} className='btn btn-primary text-black btn-xs'>Marked as picked up</button>
                                        <button onClick={() => handleAccept(parcel, 'Parcel-Delivered')} className='btn btn-secondary text-white btn-xs'>Marked as delivered</button>
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

export default AssignDeliveries;