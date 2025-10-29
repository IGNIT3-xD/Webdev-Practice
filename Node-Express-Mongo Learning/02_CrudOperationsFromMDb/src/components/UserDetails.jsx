import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
            <h3>User Details</h3>

            <h4>Name: {data.name}</h4>
            <h5>Email: {data.email}</h5>
        </>
    );
};

export default UserDetails;