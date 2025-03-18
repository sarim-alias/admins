import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen'>
        <h1 className='text-xl font-bold text-red-300'>Sarim</h1>
      </div>    
    </>
  )
}

export default App
