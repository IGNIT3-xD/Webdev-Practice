import React from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { toast } from 'react-hot-toast';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['riders', 'Pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })

    if (isLoading) return <p>Loading...</p>

    const updateStatus = (rider, status) => {
        const update = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, update)
            .then(res => {
                // console.log(res.data);
                if (res.data.modifiedCount) {
                    toast.success(`Rider ${status} !!`)
                    refetch()
                }
            })
    }

    const handleApprove = (rider) => {
        updateStatus(rider, 'Approved')
    }

    const handleReject = (rider) => {
        updateStatus(rider, "Rejected")
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Approve Riders ({data?.length})</h1>
            <div className="mt-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No.</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Work Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((rider, i) =>
                                <tr key={rider._id}>
                                    <th>{i + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.contactNo}</td>
                                    <td>{rider.riderRegion}</td>
                                    <td>{rider.riderDistrict}</td>
                                    <td>{rider.status}</td>
                                    <td>{rider.workStatus}</td>
                                    <td>
                                        <button onClick={() => handleApprove(rider)} className='btn btn-primary btn-sm text-secondary mx-3'><FaCheck /></button>
                                        <button onClick={() => handleReject(rider)} className='btn btn-secondary btn-sm text-primary'><IoPersonRemove /></button>
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

export default ApproveRiders;