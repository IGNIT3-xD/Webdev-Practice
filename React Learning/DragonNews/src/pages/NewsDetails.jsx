import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router';
import Header from './../components/Header';
import RightSection from './../components/RightSection';

const NewsDetails = () => {
    const news = useLoaderData()
    const { id } = useParams()
    // console.log(news, id);
    const navigate = useNavigate()

    const [details, setDetails] = useState([])
    useEffect(() => {
        const findNews = news.find(data => data.id === id);
        // console.log(findNews);
        setDetails(findNews)
    }, [news, id])

    return (
        <div>
            <Header></Header>
            <main className='lg:grid grid-cols-12 gap-5 container mx-auto'>
                <div className='col-span-9 shadow-sm p-5'>
                    <figure>
                        <img className='w-full h-[400px] object-cover' src={details.image_url} alt="" />
                    </figure>
                    <h1 className='text-xl font-bold my-4'>{details.title}</h1>
                    <p className='text-black/70'>{details.details}</p>
                    <button onClick={() => navigate(-1)} className='btn bg-red-500 text-white mt-5'>← Go Back</button>
                </div>
                <div className='col-span-3'>
                    <RightSection></RightSection>
                </div>
            </main>
        </div>
    );
};

export default NewsDetails;