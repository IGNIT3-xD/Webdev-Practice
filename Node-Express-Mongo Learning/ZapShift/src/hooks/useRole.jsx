import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role = 'User', isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role
        }
    })
    // console.log(role);

    return { role, isLoading };
};

export default useRole;