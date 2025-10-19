import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { logIn } = use(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        logIn(email, password)
            .then(() => {
                // console.log(result.user);
                toast.success("Login successfull !!")
                navigate(location.state || '/');
            })
            .catch(err => toast.warn(err.code))
    }

    const handleEye = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }

    return (
        <div className='grid place-self-center w-80 my-20 p-4 border border-black/5 rounded-md'>
            <form onSubmit={handleLogin} className="card-body w-full">
                <h1 className='text-xl text-center font-bold'>Login</h1>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name='email' required className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input type={showPass ? 'text' : "password"} name='password' required className="input" placeholder="Password" />
                        <button onClick={handleEye} className='cursor-pointer absolute right-2 top-2.5'>{showPass ? <LuEyeClosed className='h-5 w-10' /> : <LuEye className='h-5 w-10' />}</button>
                    </div>
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p className='mt-2'>Didn't have an account? <Link to={'/auth/registration'} className='text-red-600 hover:underline'>Register Now</Link></p>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;