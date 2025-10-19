import React from 'react';
import { Link } from 'react-router';

const LoadNewses = ({ data }) => {
    // console.log(data);
    const { title, author, thumbnail_url, rating, total_view, details, tags } = data;
    const { name, published_date, img } = author;

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                {rating?.badge && (
                    <span className="bg-yellow-400 text-white py-1 px-3 rounded-full text-sm">
                        {rating?.badge}
                    </span>
                )}
            </div>

            <div className="flex justify-between mt-4">
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full object-cover mr-3" src={img} alt={name} />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">{name}</span>
                        <span className="text-sm text-gray-500">{new Date(published_date).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center font-semibold text-yellow-400">
                    <span>{rating.number}</span> ★
                </div>
            </div>

            <img className="w-full rounded-lg mt-5" src={thumbnail_url} alt="article thumbnail" />

            <div className="text-gray-800 mt-5">
                {details.length > 200 ? <p>{details.slice(0, 200)}...<Link to={`/details/${data.id}`} className='text-green-600 hover:underline'>Read more</Link></p> : details}
            </div>

            <div className="mt-4">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 py-1 px-4 rounded-full text-sm mr-3 mb-3 inline-block">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 text-right text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{total_view} Views</span>
            </div>
        </div>
    );
};

export default LoadNewses;