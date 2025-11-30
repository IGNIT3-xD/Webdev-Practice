import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null)
    const axiosSecure = useAxiosSecure()
    const modalRef = useRef()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['parcels', ['Pending-Pickup']],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=Pending-Pickup')
            return res.data
        }
    })

    // console.log(data);

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'Available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=Approved&district=${selectedParcel.senderDistrict}&workStatus=Available`)
            return res.data
        }
    })

    // console.log(riders);

    const assignRider = (parcel) => {
        // console.log(parcel);
        setSelectedParcel(parcel);
        modalRef.current.showModal()
    }

    const handleAssign = (rider) => {
        // console.log(rider);
        const riderInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Rider has been assigned")
                    modalRef.current.close()
                    refetch()
                }
            })
    }

    if (isLoading) return <p className='text-center text-2xl font-medium my-10'>Loading...</p>

    return (
        <div>
            <h1 className='font-bold text-2xl'>Assign Riders ({data.length})</h1>
            <div className="overflow-x-auto my-6">
                <table className="table bg-base-100">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Pickup Location</th>
                            <th>Destination Location</th>
                            <th>Tracking Id</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((data, i) =>
                                <tr key={data._id}>
                                    <th>{i + 1}</th>
                                    <td>{data.parcelName}</td>
                                    <td>{data.price}</td>
                                    <td>{data.senderDistrict}</td>
                                    <td>{data.receiverRegion}</td>
                                    <td>{data.trackingId}</td>
                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => assignRider(data)} className='btn btn-primary text-secondary btn-xs'>Assign Rider</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders ({riders.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Rider District</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider, i) =>
                                        <tr key={rider._id} className="bg-base-200">
                                            <th>{i + 1}</th>
                                            <td>{rider.name}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.contactNo}</td>
                                            <td>{rider.riderDistrict}</td>
                                            <td>
                                                <button onClick={() => handleAssign(rider)} className='btn btn-xs btn-secondary'>Assign</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;