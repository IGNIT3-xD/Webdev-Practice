import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data, isLoading } = useQuery({
        queryKey: ['transection', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) return <p>Loading...</p>

    // console.log(data);

    return (
        <div>
            <h1 className='font-bold text-2xl'>Payment History</h1>
            <div className="my-6 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Customer Email</th>
                            <th>Parcel Id</th>
                            <th>Transection Id</th>
                            <th>Paid At</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    {
                        data.map((d, i) =>
                            <tbody key={d?._id}>
                                <tr>
                                    <th>{i + 1}</th>
                                    <th>{d?.parcelName}</th>
                                    <td>{d?.customerEmail}</td>
                                    <td>{d?.parcelId}</td>
                                    <td>{d?.transcationId}</td>
                                    <td>{new Date(d?.paidAt).toLocaleString()}</td>
                                    <td>{d?.amount}</td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;