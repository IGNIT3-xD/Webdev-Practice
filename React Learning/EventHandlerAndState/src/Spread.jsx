import React, { useState } from 'react';

const Spread = () => {

    const [obj, setObj] = useState({
        key1: "Key 1",
        key2: "Key 2",
        key3: "Key 3"
    })

    const change = () => {
        setObj(prev => ({
            ...prev, key1: "New value added", key3: "New value added"
        }))
    }

    return (
        <div className='margin'>
            <div>
                <h3>{obj.key1}</h3>
                <h3>{obj.key2}</h3>
                <h3>{obj.key3}</h3>
            </div>
            <button onClick={change}>Change</button>

            <AnotherSpread></AnotherSpread>
        </div>
    );
};

function AnotherSpread() {

    const myArr = ["Nipul", "Pipinul", "Vp noor"];
    const [arr, setArr] = useState([]);

    const handleArr = () => {
        setArr((prevArr) => [...prevArr, ...myArr])
    }

    return (
        <div className='margin'>
            <ol>
                {arr.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
            <button onClick={handleArr}>Click me</button>
        </div>
    )
}

export default Spread;