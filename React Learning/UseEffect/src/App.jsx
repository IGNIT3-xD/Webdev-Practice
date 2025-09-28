import { useEffect, useState } from 'react'
import './App.css'
import ApiCall from './ApiCall';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  // The component(Count)renders → then useEffect runs. / Runs after every rander
  useEffect(() => {
    console.log("This is run after the component randers.");
  })

  // Empty dependency array → runs only once.
  useEffect(() => {
    console.log("Runs only on the first render!");
  }, [])

  // With dependency array → runs when count changes
  useEffect(() => {
    console.log("Runs when count changes!");
  }, [count])

  // Without dependency array and with dependency array they look similar, but they are not the same.
  // No dependency array → Runs after every single render (initial + whenever any state or prop changes).
  // With dependency array → Runs after first render. Runs again only when count changes. Ignores other state/prop changes.

  // Api Calling with useEffect
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Click Me</button>

      <ApiCall data={data}></ApiCall>
    </>
  )
}

export default App
