import React from 'react';
import { NavLink } from 'react-router';

const LevelBtn = ({ btn }) => {
    // console.log(btn);

    return (
        <div>
            <NavLink to={`level/${btn.level_no}`} className={'px-4 py-2 rounded-sm font-medium border border-gray-200 hover:bg-[#ffd901]'}>Level {btn.level_no}</NavLink>
        </div>
    );
};

export default LevelBtn;