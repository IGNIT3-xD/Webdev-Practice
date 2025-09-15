import { useState } from "react";

const Cricket = () => {
    const [runs, setRuns] = useState(0)
    const [ballCount, setBallCount] = useState(0)
    const [overCount, setOverCount] = useState(0)

    const addRuns = () => {
        let random = Math.round(Math.random() * 6) + 1
        const newRuns = runs + random
        setRuns(newRuns)

        const newBall = ballCount + 1;
        setBallCount(newBall)

        {
            if (ballCount >= 6) {
                const newOver = overCount + 1
                setOverCount(newOver)
                setBallCount(0)
            }
        }

        // const newOver = overCount + 1
        // setOverCount(newOver)
    }

    return (
        <div>
            <h3>Runs: {runs}</h3>
            <h3>Ball(s): {ballCount}</h3>
            <h3>Over(s): {overCount}</h3>
            <button onClick={addRuns}>Bowl</button>
        </div>
    );
};

export default Cricket;