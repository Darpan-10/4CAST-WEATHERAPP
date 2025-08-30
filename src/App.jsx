
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import SignInSignUp from './components/signinsignup'
import { WeatherProvider } from './context/WeatherContext'
import React, { useState } from 'react'

function App() {
  const [showAuth, setShowAuth] = useState(false)
  return (
    <WeatherProvider>
      <Navbar onOpenAuth={() => setShowAuth(true)} />
      {showAuth && (
        <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/60'>
          <div className='relative'>
            <button
              onClick={() => setShowAuth(false)}
              className='absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white/20 text-white'>
              x
            </button>
            <SignInSignUp />
          </div>
        </div>
      )}
      <Manager />
    </WeatherProvider>
  )
}

export default App
