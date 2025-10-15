import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router';

const Registration = () => {
    const { createUser } = useContext(AuthContext)

    const handleReg = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => console.log(result.user))
            .catch(err => console.log(err.message))
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col gap-5">
                <h1 className="text-3xl font-bold">Registration now!</h1>
                <div className="card bg-base-100 w-64 max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleReg} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" />
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <button className="btn btn-neutral mt-4">Sign Up</button>
                        </fieldset>
                        <p>Already have an account? <Link to={'/login'} className='text-blue-600'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;