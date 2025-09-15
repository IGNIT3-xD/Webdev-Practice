import "./App.css"

function App() {
  return (
    <>
      <h1 className="header">Hello From React</h1>

      {/* Component passing */}
      <Greetings />
      <Players name="Ronaldo" nation="Portugal"></Players>
      <Players name="Neymar" nation="Brazil"></Players>
    </>
  )
}

// External style and Obj passing
function Greetings() {
  const person = { name: 'Imran', age: 22 }

  return (
    <>
      <h4>Good Day <span className="name">Mr. {person.name}</span> </h4>
      <h4>My age is {person.age}</h4>
    </>
  )
}

// Destructuing
const Players = ({ name, nation }) => {
  return (
    <>
      <p>Name: {name}</p>
      <p>Nationality: {nation}</p>
    </>
  )
}



// More in Test.jsx //

export default App