import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    // console.log(sessionId);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="mx-auto my-20 card bg-secondary text-primary w-96">
            <div className="card-body">
                <h2 className="card-title">Payment Success!</h2>
                <p>Your Payment has been completed.</p>
                <div className="card-actions justify-end">
                    <Link to={'/dashboard/my-parcels'} className="btn btn-primary text-black">Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;