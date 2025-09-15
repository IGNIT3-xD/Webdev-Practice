const Test = () => {
    return (
        <div>
            {/* In line style */}
            <h3 style={
                { color: 'red', border: '2px solid', padding: '10px', borderRadius: '8px', width: '50%', margin: 'auto' }
            }>Testing.....1, 2, 3</h3>

            <Todo task="Learning" isDone={true}></Todo>
            <Todo task="Showering" isDone={false}></Todo>
            <Todo task="Walking" isDone={true}></Todo>
            <Todo2 task='Slepping' isFinished={true}></Todo2>
            <Todo2 task='Gaming' isFinished={true}></Todo2>
            <Todo2 task='Eating' isFinished={false}></Todo2>
            <Games></Games>
        </div>
    );
};

// Conditional randering (If else)
const Todo = ({ task, isDone }) => {

    if (isDone) {
        return <li>Task : {task}, Is finished : ✔</li>
    }
    else {
        return <li>Task : {task}, Is finished : ❌</li>
    }
}

// (Ternary)
function Todo2({ task, isFinished }) {
    return isFinished ? <h4>{task} finished</h4> : <h4>{task} is not finished yet.</h4>
}

// Ilterate through an array
function Games() {
    const games = ['Gta', 'Fifa', 'Pes', 'Rdr', 'Twd'];
    return (
        <>
            {games.map((game, i) => <li key={i}>{game}</li>)}
        </>
    )
}

export default Test;