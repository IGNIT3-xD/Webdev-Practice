import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AvailablePlayers = ({ player, availableBlance, setAvailableBalance, selectedPlayers, setSelectedPlayers }) => {

    const [isSelected, setIsSelected] = useState(false)

    const handleSelected = () => {

        // console.log(selectedPlayers.length);
        if (selectedPlayers.length > 5) {
            toast.warning("You can't add more than 6 players");
            return;
        }

        let playerValue = parseInt(player.player_price.replace(/[^0-9]/g, ""))
        // console.log(playerValue);
        if (availableBlance < playerValue) {
            toast("You Don't Have Enough Balance")
            return;
        }

        setIsSelected(true)
        setAvailableBalance(availableBlance - playerValue)

        setSelectedPlayers([...selectedPlayers, player])
        // setSelectedPlayers(prev => [...prev, player])
    }

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <img src={player.player_img} className="h-60 object-cover rounded-xl" />
                <div className="p-4">

                    <h2 className="card-title my-2"><FontAwesomeIcon icon={faUser} /> {player.player_name}</h2>
                    <div className='flex items-center justify-between my-2'>
                        <p><FontAwesomeIcon className='text-black/50' icon={faFlag} /> {player.player_country}</p>
                        <p className='bg-gray-200/30 rounded-xl px-4 py-2'>Foot: {player.preferred_foot}</p>
                    </div>

                    <div className='font-medium my-3 flex items-center justify-between'>
                        <p>Rating: {player.player_rating}</p>
                        <p>Position: {player.player_position}</p>
                    </div>

                    <div className="card-actions my-3 flex items-center justify-between">
                        <p className='font-medium'>Market Value: <span className='text-red-600'>{player.player_price}</span></p>
                        <button disabled={isSelected} onClick={handleSelected} className='btn'>{isSelected ? "Selected" : "Choose Player"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailablePlayers;