import React from 'react';
import { useLoaderData } from 'react-router';

const Update = () => {
    const data = useLoaderData()
    console.log(data);

    const handleUpdateUser = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const updatedUser = { name, email }

        fetch(`http://localhost:5000/users/${data._id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log("After update ", data);
                if (data.modifiedCount) {
                    alert('User info. has been updated!!')
                    e.target.reset()
                }
            })
    }

    return (
        <div>
            <h2>Update Info.</h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={data.name} placeholder='Name' /> <br />
                <input type="email" name='email' defaultValue={data.email} placeholder='Email' /> <br />
                <button>Update User</button>
            </form>
        </div>
    );
};

export default Update;