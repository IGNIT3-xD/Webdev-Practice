import React, { use } from 'react';
import AvailablePlayers from './AvailablePlayers';

const Players = ({ fetchPlayers, availableBlance, setAvailableBalance, selectedPlayers, setSelectedPlayers }) => {
    const playersData = use(fetchPlayers)

    return (

        <div className='my-10 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center'>
            {
                playersData.map((player, i) => <AvailablePlayers
                    key={i}
                    player={player}
                    availableBlance={availableBlance}
                    setAvailableBalance={setAvailableBalance}
                    selectedPlayers={selectedPlayers}
                    setSelectedPlayers={setSelectedPlayers}
                ></AvailablePlayers>)
            }
        </div>

    );
};

export default Players;