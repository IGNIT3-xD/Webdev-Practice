import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const UserDetails = () => {
    const details = useLoaderData()
    console.log(details);
    
    const navigate = useNavigate()

    return (
        <div>
            <h3>User Details</h3>
            <div className='card' style={{ margin: "18px" }}>
                <h4>{details.name}</h4>
                <h4>{details.address.city}, {details.address.street}</h4>
                <h5>Phone: {details.phone}</h5>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default UserDetails;