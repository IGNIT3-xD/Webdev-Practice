import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location);
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate(location.state || '/')
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col gap-5">
                <h1 className="text-3xl font-bold">Login now!</h1>
                <div className="card bg-base-100 w-64 max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;