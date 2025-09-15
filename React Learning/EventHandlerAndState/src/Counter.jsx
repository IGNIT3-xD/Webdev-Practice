import { useState } from "react";

const Counter = () => {

    const [count, setCount] = useState(0)

    const addNum = () => {
        let newCount = count + 1
        setCount(newCount)
    }

    return (
        <div>
            <h3>Counter: {count}</h3>
            <button onClick={addNum}>Add</button>
        </div>
    );
};

export default Counter;