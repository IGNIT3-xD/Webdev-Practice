import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import LoadNewses from './LoadNewses';

const CatagoryNews = () => {
    const { id } = useParams()
    // const news = useLoaderData()
    // console.log(news);

    const news = useLoaderData()
    // console.log(news);
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        if (id === '0') {
            setNewsData(news);
            return;
        }

        else if (id === '1') {
            const filteredNews = news.filter(data => data.others.is_today_pick === true);
            setNewsData(filteredNews)
            return;
        }

        else {
            const filteredNews = news.filter(data => data.category_id === parseInt(id))
            // console.log(filteredNews);
            setNewsData(filteredNews);
        }

    }, [id, news])

    return (
        <div>
            <p className='font-bold'>News found <span className='text-xs text-black/60'>({newsData.length})</span></p>
            <div className='space-y-5'>
                {
                    newsData.length === 0 ? <p className='text-2xl font-bold text-center my-10 text-black/60'>News have not published yet !!</p> :
                        newsData.map(data => <LoadNewses key={data.id} data={data}></LoadNewses>)
                }
            </div>
        </div>
    );
};

export default CatagoryNews;