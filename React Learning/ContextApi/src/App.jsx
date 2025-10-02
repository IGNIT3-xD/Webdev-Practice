import { createContext, useState } from 'react'
import './App.css'
import Comp1 from './Components/Comp1'

// eslint-disable-next-line react-refresh/only-export-components
export const MoneyContext = createContext('')

function App() {

  const [money, setMoney] = useState(0)

  return (
    <>
      <div className='box'>
        <h4 style={{ color: 'lightcoral' }}>Total Money: {money}</h4>

        <MoneyContext.Provider value={[money, setMoney]}>
          <Comp1></Comp1>
        </MoneyContext.Provider>
      </div>
    </>
  )
}

export default App
