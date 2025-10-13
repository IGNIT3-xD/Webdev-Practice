import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth } from './../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router';


const Reg = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleReg = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const isChecked = e.target.terms.checked;
        console.log(name, email, pass, isChecked);

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/
        if (!passwordPattern.test(pass)) {
            setError("Password must be at least 6 characters and one Upper case, one Lower case letter, one special and at least one digit");
            return;
        }

        if (!isChecked) {
            setError("Please, accept our terms and conditions");
            return;
        }

        // Reset
        setError('')
        setSuccess(false)

        createUserWithEmailAndPassword(auth, email, pass)
            .then(res => {
                console.log(res.user);
                setSuccess(true)
                e.target.reset()

                //Update profile
                const profile = { displayName: name }
                updateProfile(res.user, profile)
                    .then(() => { })
                    .catch(err => setError(err.message))

                //Verify user
                sendEmailVerification(res.user)
                    .then(() => alert('Please Verify Your Account. Check your Email Inbox/Span folder'))
            })
            .catch(err => setError(err.message))
    }

    const handleEyeBtn = (e) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-5">Registration now!</h1>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse w-80 my-3">
                    <div className="card border border-white/20 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleReg} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">User name</label>
                                <input type="text" className="input" name='name' placeholder="Your Username" />
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input type={showPass ? 'text' : "password"} className="input" name='password' placeholder="Password" />
                                    <button onClick={handleEyeBtn} className='btn btn-xs absolute right-2 top-2'>{showPass ? <FaEyeSlash /> : <FaEye />}</button>
                                </div>
                                <label className="label mt-2">
                                    <input type="checkbox" name='terms' defaultChecked className="checkbox" />
                                    Accept Our Terms and Conditions
                                </label>
                                <button className="btn btn-neutral mt-4">Registration</button>
                            </fieldset>
                            {
                                error && <p className='text-red-500 text-center'>{error}</p>
                            }

                            {
                                success && <p className='text-green-500 text-center'>Registration Successfull</p>
                            }
                            <p>Already have an account? <Link to={'/login'} className='text-blue-400 underline'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reg;