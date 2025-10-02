import React, { use } from 'react';
import { MoneyContext } from '../App';

const Comp2 = () => {

    const [money, setMoney] = use(MoneyContext)

    return (
        <div className='box'>
            <h4 style={{ color: 'lightsalmon' }}>Component 2</h4>
            <button onClick={() => setMoney(money + 1000)}>Add 1000</button>
        </div>
    );
};

export default Comp2;