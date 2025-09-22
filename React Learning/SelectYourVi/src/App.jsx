import { Suspense, useState } from 'react';
import Players from './Components/Players';
import Loading from './Components/Loading';
import Logo from './resources/assets/image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Hero from './Components/Hero';
import SelectedPlayer from './Components/SelectedPlayer';
import { ToastContainer} from 'react-toastify';

const fetchPlayers = fetch('Players.json')
  .then(res => res.json())

function App() {

  const [toggle, setToggle] = useState(true)
  const [availableBlance, setAvailableBalance] = useState(600)
  const [selectedPlayers, setSelectedPlayers] = useState([])
  // console.log(selectedPlayers);

  const removePlayer = (p) => {
    // console.log(p);
    const filterData = selectedPlayers.filter((player) => player.player_name !== p.player_name)
    setSelectedPlayers(filterData)

    let playerValue = parseInt(p.player_price.replace(/[^0-9]/g, ""))
    setAvailableBalance(availableBlance + playerValue)
  }

  return (
    <>
      <nav className='shadow-sm py-2 px-4 flex items-center justify-between w-11/12 mx-auto my-5'>
        <img className='w-16' src={Logo} alt="logo" />
        <div>
          <p className='font-medium text-xl border border-black/30 px-4 py-2 rounded-xl'>{availableBlance}M <FontAwesomeIcon className='text-2xl text-orange-500' icon={faCoins} /></p>
        </div>
      </nav>

      <Hero></Hero>

      <div className='w-11/12 mx-auto my-10 flex items-center justify-between'>
        <p className='font-bold text-xl'>{toggle ? "Available Players" : `Selected Players (${selectedPlayers.length}/6)`}</p>
        <div>
          <button onClick={() => setToggle(true)} className={`btn font-bold rounded-l-xl ${toggle ? 'bg-yellow-300' : 'text-black/60'}`}>Available</button>
          <button onClick={() => setToggle(false)} className={`btn font-bold rounded-r-xl ${!toggle ? 'bg-yellow-300' : 'text-black/60'}`}>Selected ({selectedPlayers.length})</button>
        </div>
      </div >

      {
        toggle ?
          <Suspense fallback={<Loading></Loading>} >
            <Players
              fetchPlayers={fetchPlayers}
              availableBlance={availableBlance}
              setAvailableBalance={setAvailableBalance}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            ></Players>
          </Suspense > :
          <SelectedPlayer
            selectedPlayers={selectedPlayers}
            removePlayer={removePlayer}
          ></SelectedPlayer>
      }

      <ToastContainer />
    </>
  )
}

export default App
