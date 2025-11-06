import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"
import { use } from "react"
import { useEffect } from "react"

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
})

export const useAxiosSecure = () => {
    const { user, logout } = use(AuthContext)

    useEffect(() => {
        const requestInterceptopr = instance.interceptors.request.use((config) => {
            config.headers.authoraization = `Bearer ${user.accessToken}`
            return config;
        })

        const responseInterceptor = instance.interceptors.response.use((res) => {
            return res;
        }, (err) => {
            if (err.status === 403 || err.status === 401) {
                logout()
                    .then(() => { })
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptopr)
            instance.interceptors.request.eject(responseInterceptor)
        }

    }, [user, logout])

    return instance;
}