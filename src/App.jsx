import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
// import Card from './Components/Card'
import Face from './Components/Face'
import Find from './Components/Find'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />  
    <Face />
    <Find />
    </>
  )
}

export default App
