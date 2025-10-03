import React, { use } from 'react';

const WordsDetails = ({ wordDet }) => {
    const details = use(wordDet)
    // console.log(details);

    return (
        <div className='text-center'>
            <p className='text-xl my-4'>Sentence: {details.data.sentence}</p>
            <p className='text-xl font-bold my-2'>Synonyms</p>
            <p className='font-medium text-[#F4991A]'>{details.data.synonyms.length === 0 ? "—" : details.data.synonyms.join(" / ")}</p>
        </div>
    );
};

export default WordsDetails;