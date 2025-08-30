import React from 'react'
import { useWeather } from '../context/WeatherContext'


const Navbar = ({ onOpenAuth }) => {
    const { setCity } = useWeather();
    
    return (
        <div className='flex items-center justify-around my-4'>
            <span className='text-white flex items-center'><img src="/imageicon/clouds.png" height={75} width={75} alt="" /> <span className='text-6xl'>4</span>  <span className='font-bold text-2xl'>CAST</span> </span>
           <div className='block h-12 w-1/3 rounded-full border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]\tbg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#8678f9)] focus:outline-none'>
             <input  type="text"
             onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const newCity = e.target.value.trim();
                  if (newCity) {
                    setCity(newCity);
                    e.target.value = '';
                  }
                }
              }}  placeholder='Search city...' />
           </div>
            <img className='absolute left-7/11 brightness-60' src="/imageicon/search.png" alt="" />
            <button onClick={onOpenAuth} className='gap-2 cursor-pointer inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-gray-800 bg-gradient-to-r from-gray-900 to-blue-1000 px-6 font-medium text-gray-300 shadow-2xl transition-colors focus:outline '>
              Sign Up/ Sign In
            </button>
        </div>
    )
}

export default Navbar
