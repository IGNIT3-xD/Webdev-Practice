import { useRef } from 'react'
import './App.css'

function App() {

  let heading = useRef()
  let heading2 = useRef()

  const change = () => {
    heading.current.innerText = 'Hello from UseRef'
    heading2.innerText = 'Bla bla bla...'
  }

  return (
    <>
      <h1 ref={heading}></h1>
      <h3 ref={(h3) => heading2 = h3}>Hola man tale tale vuu..</h3>

      <button onClick={change}>Change</button>

      <Demo></Demo>
    </>
  )
}

function Demo() {

  let firstName, lastName = useRef()

  const submit = () => {
    let fName = firstName.value;
    let lName = lastName.value;

    alert(fName + " " + lName)
  }

  return (
    <div>
      <input ref={(fn) => firstName = fn} type="text" placeholder='Enter First Name' /><br />
      <input ref={(ln) => lastName = ln} type="text" placeholder='Enter Last Name' /> <br />
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default App
