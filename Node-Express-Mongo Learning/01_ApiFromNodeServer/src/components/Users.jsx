import React, { use } from 'react';
import { useState } from 'react';

const Users = ({ userPromise }) => {
    const initialUsers = use(userPromise)
    // console.log(initialUsers);
    const [user, setUser] = useState(initialUsers)

    const handleAddUser = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        // console.log(name, email);
        const newUser = { name, email }

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('After post', data)
                setUser([...user, data])
            })
    }

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <h2>Add a user</h2>
                <input type="text" name="name" placeholder='Name' /><br />
                <input type="email" name="email" placeholder='Email' /><br />
                <button>Add User</button>
            </form>

            {
                user.map(user => <div key={user.id}>
                    <h4>Name: {user.name}</h4>
                    <p>Email: {user.email}</p>
                </div>)
            }
        </div>
    );
};

export default Users;