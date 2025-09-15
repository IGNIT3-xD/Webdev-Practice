import './App.css'

function App() {
  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => { alert("Button clicked") }}>Click me 2</button>
      <button onClick={() => { addNum(95) }}>Add 5</button>
    </>
  )
}

const handleClick = () => {
  alert("Clicked")
}

// Pass the parameter
function addNum(num) {
  num = num + 5
  alert(num)
}

export default App
