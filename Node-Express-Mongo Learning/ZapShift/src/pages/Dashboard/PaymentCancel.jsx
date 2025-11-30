import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className="mx-auto my-20 card bg-red-500 text-white w-96">
            <div className="card-body">
                <h2 className="card-title">Payment Canceled!</h2>
                <p>Your Payment has been canceled.</p>
                <div className="card-actions justify-end">
                    <Link to={'/dashboard/my-parcels'} className="btn btn-primary text-black">Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;