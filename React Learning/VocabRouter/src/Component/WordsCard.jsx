import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import WordsDetails from './WordsDetails';

const WordsCard = ({ word }) => {
    const navigate = useNavigate();
    const [showDet, setShowDet] = useState(false)
    const wordDet = fetch(`https://openapi.programming-hero.com/api/word/${word.id}`)
        .then(res => res.json())

    return (
        <div className="shadow-sm text-center p-8 space-y-4 bg-white rounded-md">
            <p className='font-bold text-2xl'>{word.word}</p>
            <p className='text-xl'>Meaning / Pronounciation</p>
            <p className='font-bold text-2xl text-[#F4991A]'>"{word.meaning === null ? "—" : word.meaning} / {word.pronunciation}"</p>
            <div className='flex items-center justify-center gap-4'>
                <button onClick={() => setShowDet(!showDet)} className='btn hover:bg-[#ffd901]'>{showDet ? "Hide Details" : "Show Details"}</button>
                <button onClick={() => navigate(-1)} className='btn hover:bg-[#ffd901]'>Go Back</button>
            </div>

            {
                showDet && <Suspense>
                    <WordsDetails key={word.id} wordDet={wordDet}></WordsDetails>
                </Suspense>
            }
        </div>
    );
};

export default WordsCard;