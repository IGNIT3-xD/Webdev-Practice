import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import WordsCard from './WordsCard';
import NoWords from './NoWords';

const WordsByLevel = () => {
    const words = useLoaderData()
    // console.log(words);
    const wordsData = words.data
    // console.log(wordsData.length);
    const { levelId } = useParams()

    return (
        <div>
            <p className='text-center my-10 font-bold text-2xl'>Welcome to <span className='text-[#F4991A]'>Level {levelId}</span></p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 items-start bg-gray-100/50 p-5'>
                {
                    wordsData.length === 0 ?
                        <NoWords></NoWords> :
                        wordsData.map(word => <WordsCard key={word.id} word={word}></WordsCard>)
                }
            </div>
        </div>
    );
};

export default WordsByLevel;