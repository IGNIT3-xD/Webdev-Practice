import React, { Suspense, use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import UserDetails2 from './UserDetails2';

const Users2 = ({ userPromise }) => {
    const users = use(userPromise)
    console.log("Users 2 load: ", users);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", margin: "28px" }}>
            <h2 style={{ gridColumn: "span 3" }}>Users 2</h2>
            {
                users.map(user => <User key={user.id} user={user}></User>)
            }
        </div>
    );
};

const User = ({ user }) => {
    // console.log(user);
    const navigate = useNavigate()

    const [showDet, setShowDet] = useState(false)
    const detPromise = fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
        .then(res => res.json())

    return (
        <div className='card'>
            <h4>Name: {user.name}</h4>
            <h5>Mail: {user.email}</h5>
            <div className='btn'>
                {/* <Link to={`${user.id}`}>Show Details</Link> */}
                <button onClick={() => navigate(`${user.id}`)}>Show Details</button>

                <button onClick={() => setShowDet(!showDet)}>{showDet ? "Hide Details" : "Show Details Here"}</button>
            </div>

            {
                showDet &&
                <Suspense fallback={<h3>Loading...</h3>}>
                    <UserDetails2 detPromise={detPromise}></UserDetails2>
                </Suspense>
            }
        </div>
    )
}

export default Users2;