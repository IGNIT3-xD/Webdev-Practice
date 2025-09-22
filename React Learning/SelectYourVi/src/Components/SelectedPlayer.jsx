import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SelectedPlayer = ({ selectedPlayers, removePlayer }) => {
    // console.log(selectedPlayers);
    return (
        <div className='w-11/12 mx-auto my-10'>
            {
                selectedPlayers.map((player, i) => <PlayersData key={i} player={player} removePlayer={removePlayer}></PlayersData>)
            }
        </div>
    );
};

const PlayersData = ({ player, removePlayer }) => {
    return (
        <div className='flex items-center justify-between my-4 border border-gray-300 rounded-lg p-2'>
            <div className='flex items-center gap-4'>
                <img className='w-24 rounded-sm' src={player.player_img} alt="" />
                <div className='space-y-2'>
                    <p className='font-bold text-xl'>{player.player_name}</p>
                    <p className='font-medium'>{player.player_position}</p>
                </div>
            </div>
            <div>
                <FontAwesomeIcon onClick={() => removePlayer(player)} className='btn text-2xl p-2' icon={faTrash} />
            </div>
        </div>
    )
}

export default SelectedPlayer;