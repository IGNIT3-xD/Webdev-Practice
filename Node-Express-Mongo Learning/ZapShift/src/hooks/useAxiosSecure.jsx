import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const { user, logout } = useAuth()
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user?.accessToken}`
            return config
        })

        const responseInerceptor = instance.interceptors.response.use(res => {
            return res;
        }, (err) => {
            if (err.status === 403 || err.status === 401) {
                logout()
                    .then(() => { })
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInerceptor)
        }

    }, [user, logout])

    return (
        instance
    );
};

export default useAxiosSecure;