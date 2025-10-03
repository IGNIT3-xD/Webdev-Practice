import React from 'react';
import { PacmanLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className='flex items-center justify-center my-64'>
            <PacmanLoader
                color="#F4991A"
                size={30} />
        </div>
    );
};

export default Loading;