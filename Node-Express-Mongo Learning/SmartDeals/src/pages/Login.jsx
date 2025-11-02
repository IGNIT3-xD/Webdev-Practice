import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { loginUser, setUser, googleSignIn } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location);

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                setUser(result.user)
                toast.success("Login Successfull!!")
                e.target.reset()
                navigate(location.state || '/')
            })
            .catch(err => toast.error(err.code))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                setUser(result.user)
                toast.success("Login Sucessfull!!")
                navigate(location.state || '/')
            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div>
            <div className="card bg-base-100 w-full mx-auto my-5 max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <p className='text-2xl text-center font-medium'>Login</p>
                    <p className='text-center'>Don't have an account? <Link to={'/register'} className='text-primary underline'>Register Now</Link></p>
                    <form onSubmit={handleLogin} className="fieldset mt-2">
                        <label className="label">Email</label>
                        <input type="email" name='email' required className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' required className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn mt-4 bg-linear-to-l from-blue-600 to-blue-800 text-white">Login</button>
                    </form>
                    <div className='divider'>Or</div>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;