import React, { useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../firebase.init';

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const emailRef = useRef()
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;
        console.log(email, pass);

        setError('')

        signInWithEmailAndPassword(auth, email, pass)
            .then(res => {
                console.log(res.user)

                if (!res.user.emailVerified) {
                    alert("Please Verify your email")
                    return;
                }

                navigate('/home')
            })
            .catch(err => setError(err.message))
    }

    const handleEyeBtn = e => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value;
        // console.log(email);
        sendPasswordResetEmail(auth, email)
            .then(() => alert('Check your email'))
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-5">Login now!</h1>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse w-80 my-3">
                    <div className="card border border-white/20 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' ref={emailRef} placeholder="Email" />
                                <div className='relative'>
                                    <input type={showPass ? 'text' : "password"} className="input" name='password' placeholder="Password" />
                                    <button onClick={handleEyeBtn} className='btn btn-xs absolute right-2 top-2'>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                </div>
                                <div><a onClick={handleForgetPass} className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            <p>Didn't have an account? <Link to={'/signup'} className='text-blue-400 underline'>Create an account</Link></p>

                            {
                                error && <p className='text-center text-red-500'>Invalid Email/Password</p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;