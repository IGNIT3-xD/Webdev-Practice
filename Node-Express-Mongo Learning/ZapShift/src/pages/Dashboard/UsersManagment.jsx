import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { GoShieldX } from "react-icons/go";
import { toast } from 'react-hot-toast';

const UsersManagment = () => {
    const axiosSecure = useAxiosSecure()

    const { data: user, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    if (isLoading) return <p className='text-center text-2xl font-medium my-10'>Loading...</p>

    const makeAdmin = (user) => {
        // console.log(id);
        const roleInfo = { role: 'Admin' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast(`${user.displayName} Marked as an Admin`)
                    refetch()
                }
            })
    }

    const removeAdmin = (user) => {
        const roleInfo = { role: 'User' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast(`${user.displayName} Removed from Admin`)
                    refetch()
                }
            })
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Users Managment</h1>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, i) =>
                                <tr key={user._id}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                        alt="user image" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-80">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-medium'>
                                        {new Date(user.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: '2-digit',
                                            minute: 'numeric',
                                            second: '2-digit'
                                        })}
                                    </td>
                                    <td className='badge bg-primary text-secondary my-6'>{user.role}</td>
                                    <th>
                                        {
                                            user.role === 'Admin' ?
                                                <button onClick={() => removeAdmin(user)} title='Remove from admin' className="btn"><GoShieldX /></button> :
                                                <button onClick={() => makeAdmin(user)} title='Make admin' className="btn"><FaUserShield /></button>
                                        }
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagment;