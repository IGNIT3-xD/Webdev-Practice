import React, { useContext } from 'react';
import Comp2 from './Comp2';
import { MoneyContext } from '../App';

const Comp1 = () => {

    const [money, setMoney] = useContext(MoneyContext)

    return (
        <div className='box'>
            <h4>Money: {money}</h4>
            <h4 style={{ color: "lightgreen" }}>Component 1</h4>
            <button onClick={() => setMoney(money + 500)}>Add 500</button>
            <Comp2></Comp2>
        </div>
    );
};

export default Comp1;