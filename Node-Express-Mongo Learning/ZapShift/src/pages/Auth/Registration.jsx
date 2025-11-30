import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from './../../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Registration = () => {
    const [showPass, setShowPass] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signUp, googleLogin, updateUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    // console.log(location);

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const onSubmit = (data) => {
        // console.log(data);
        const profileImg = data.photo[0]

        signUp(data.email, data.password)
            .then(() => {
                // console.log(res.user);
                // 1.Store the img in FormData
                const formData = new FormData()
                formData.append('image', profileImg)

                // 2.Send the img to the hosting api
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Host}`, formData)
                    .then((res) => {
                        // console.log(res.data);

                        // 3.Update the profile
                        const profile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast("User has been created");
                                }
                            })

                        updateUser(profile)
                            .then(() => {
                                toast.success('Account created successfully !!')
                                navigate(location?.state || '/')
                            })
                            .catch(err => toast.error(err.code))
                    })
            })
            .catch(err => toast.error(err.code))
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                // console.log(res.user);
                toast.success("Sign In Sucessfully !!")

                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.name,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast("User has been created");
                        }
                    })

            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div>
            <h1 className='text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-black'>Create an Account</h1>
            <p className='text-center  md:text-left text-secondary mt-2'>Register with ZapShift</p>

            <div className="card mt-3 px-10 py-6 w-90 md:w-[400px] border border-black/10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input {...register("name", { required: true, minLength: 2 })} type="text" className="input" placeholder="name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-600 font-medium'>⚠ Name is required.</p>
                        }
                        {
                            errors.name?.type === 'minLength' && <p className='text-red-600 font-medium'>⚠ Name is too short.</p>
                        }

                        <label className="label">Email</label>
                        <input {...register("email", { required: true })} type="email" className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-600 font-medium'>⚠ Email is required</p>
                        }

                        <label className="label">Password</label>
                        <div className='relative'>
                            <input {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/ })} type={showPass ? "text" : "password"} className="input" placeholder="Password" />
                            <span onClick={handleShowPass} className='absolute top-3 right-4 text-[16px] cursor-pointer'>{showPass ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-600 font-medium'>⚠ Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600 font-medium'>⚠ Password must be 6 characters or longer</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-600 font-medium'>⚠ Password must be contains at least one lowercase, one uppercase, one special characters and one digit</p>
                        }

                        <label className="label">Profile Picture</label>
                        <input {...register("photo", { required: true })} type="file" className="file-input" />
                        {
                            errors.photo?.type === 'required' && <p className='text-red-600 font-medium'>⚠ Photo is required</p>
                        }

                        <button className="btn btn-primary text-black mt-4">Sign Up</button>
                    </fieldset>
                </form>

                <p className='my-2 text-sm text-secondary'>Already have any account? <Link state={location.state} to='/login' className='text-green-500 link link-hover'>Login</Link></p>

                <div className='divider'>Or</div>

                <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Registration;