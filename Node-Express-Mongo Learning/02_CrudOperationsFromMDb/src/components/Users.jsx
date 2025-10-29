import React from 'react';
import { useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise)
    // console.log(initialUsers);
    const [users, setUsers] = useState(initialUsers)

    const handleAddUser = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const newUser = { name, email }

        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {

                    console.log(newUser._id);
                    newUser._id = data.insertedId;
                    console.log(newUser._id);
                    setUsers([...users, newUser])

                    e.target.reset();
                    alert("User has been added!!")
                }
            })
    }

    const handleDelUser = (id) => {
        console.log(id);

        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log("After delete", data);
                if (data.deletedCount) {
                    alert("User have been deleted!!")

                    const remainingUsers = users.filter(user => user._id !== id)
                    setUsers(remainingUsers)
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input type="text" name='name' placeholder='Name' /> <br />
                <input type="email" name='email' placeholder='Email' /> <br />
                <button>Add User</button>
            </form>

            <hr />

            <div>
                <h4>Users - {users.length}</h4>
                {
                    users.map(user => <p key={user._id}>{user.name} : {user.email}
                        <button onClick={() => handleDelUser(user._id)} style={{ margin: '0px 16px' }}>x</button>
                        <Link to={`users/${user._id}`}>Details</Link>
                        <Link to={`update/${user._id}`} style={{ marginLeft: '16px' }}>Edit</Link>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;