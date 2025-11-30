import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from './../../hooks/useAxios';

const TrackAParcel = () => {
    const { trackingId } = useParams()
    const instance = useAxios()

    const { data, isLoading } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await instance.get(`/tracking/${trackingId}/logs`)
            return res.data
        }
    })

    if (isLoading) return <p className='text-center text-2xl font-medium my-10'>Loading...</p>

    console.log(data);

    return (
        <div className='py-8'>
            <h2 className='text-xl font-bold'>Track Your Parcel : {trackingId}</h2>

            <ul className="timeline timeline-vertical">
                {
                    data.map(log =>
                        <li className='my-1' key={log._id}>
                            <div className="timeline-start timeline-box">{new Date(log.creadtedAt).toLocaleString()}</div>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="text-primary h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">{log.details}</div>
                            <hr className="bg-primary" />
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default TrackAParcel;