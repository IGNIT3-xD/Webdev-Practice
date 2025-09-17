import { useState } from "react"

function App() {

  const [color, setColor] = useState('bg-[#242424]')

  return (
    <div className={`h-screen w-full ${color} p-5 transition-color duration-300`}>
      <div className="flex flex-wrap gap-5 bg-white rounded-xl items-center justify-center w-fit mx-auto px-4 py-2 shadow-lg">
        <button className="bg-gray-800" onClick={() => setColor("bg-[#242424]")}>Dark</button>
        <button className="bg-blue-800" onClick={() => setColor("bg-blue-800")}>Blue</button>
        <button className="bg-green-800" onClick={() => setColor("bg-green-800")}>Green</button>
        <button className="bg-purple-600" onClick={() => setColor("bg-purple-400")}>Purple</button>
        <button className="bg-gray-400" onClick={() => setColor("bg-white/80")}>White</button>
        <button className="bg-red-800" onClick={() => setColor("bg-red-800")}>Red</button>
      </div >
    </div>
  )
}

export default App