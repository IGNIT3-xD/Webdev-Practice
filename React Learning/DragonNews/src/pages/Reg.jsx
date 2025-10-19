import React, { use, useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const Reg = () => {
    const { createUser } = use(AuthContext)
    const [showPass, setShowPass] = useState(false)

    const handleReg = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                // console.log(result.user)
                toast.success("Registration Successfull !!")
                const profile = { displayName: name }
                updateProfile(result.user, profile)
                    .then(() => { })
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    toast.warning('Account already exist. Please login')
                }
            })

    }

    const handleEye = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }

    return (
        <div className='grid place-self-center w-80 my-20 p-4 border border-black/5 rounded-md'>
            <form onSubmit={handleReg} className="card-body w-full">
                <h1 className='text-xl text-center font-bold'>Registration</h1>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" name='name' className="input" placeholder="Name" required />
                    <label className="label">Email</label>
                    <input type="email" name='email' className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input type={showPass ? 'text' : "password"} name='password' className="input" required placeholder="Password" />
                        <button onClick={handleEye} className='cursor-pointer absolute right-2 top-2.5'>{showPass ? <LuEyeClosed className='h-5 w-10' /> : <LuEye className='h-5 w-10' />}</button>
                    </div>
                    <button className="btn btn-neutral mt-4">Registration</button>
                    <p className='mt-2'>Already have an account? <Link to={'/auth/login'} className='text-red-600 hover:underline'>Login Now</Link></p>
                </fieldset>
            </form>
        </div>
    );
};

export default Reg;