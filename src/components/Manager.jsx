import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';



const Manager = () => {
  const { weatherData, forecastData, hourlyForecastData} = useWeather();

  const getWeatherIcon = (iconCode) => {
    const icons = {
      '01d': 'sun.png', // clear sky day
      '01n': 'moon.png', // clear sky night
      '02d': 'suncloud.png', // few clouds day
      '02n': 'mooncloud.png', // few clouds night
      '03d': 'suncloud.png', // scattered clouds
      '03n': 'mooncloud.png', // scattered clouds
      '10d': 'sunrainy.png', // rain
      '10n': 'moonrainy.png', // rain
      '11d': 'storm.png', // thunderstorm
      '11n': 'storm.png', // thunderstorm
      '13d': 'snow.png', // snow
      '13n': 'snow.png', // snow
      '50d': 'haze.png', // mist
      '50n': 'haze.png', // mist
    };

    const iconName = icons[iconCode] || 'cloud.png';
    return `/weathericon/${iconName}`;
  };

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };
  
  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  return (
    <div className='flex'>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div>
        <div className='text-white mx-20 bg-white/5 shadow-xl p-4 w-90 rounded-3xl flex flex-col'>
          <span className='text-2xl font-bold p-2'>Now</span>
          {weatherData && (
            <>
              <div className='flex items-center justify-around gap-10 my-2'>
                <span className='text-6xl'><span className='text-6xl'>{Math.round(weatherData.main.temp)}</span>&deg;c</span>
                <span><img className='shadow-lg' height={70} width={70} src={getWeatherIcon(weatherData.weather[0].icon)} alt='' /></span>
              </div>
              <span className='p-2 text-xl border-b my-2'>{weatherData.weather[0].description}</span>

              <div className='my-1 flex gap-1 items-center'>
                <img src="/imageicon/location.png" alt="location" />
                <span>{weatherData.name}, {weatherData.sys.country}</span>
              </div>
              <div className='my-1 flex gap-1 items-center'>
                <img src="/imageicon/calender.png" alt="calendar" />
                <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </>
          )}
        </div>
        
        <div className='text-white mx-20 my-4 bg-white/5 shadow-xl p-4 w-90 rounded-3xl flex flex-col'>
          <span className='text-2xl font-bold p-2'>5-Days Forecast</span>
          {forecastData && forecastData.length > 0 ? (
            <div className='flex gap-'>
              <ul className='text-md flex flex-col gap-1'>
                {forecastData.map((forecast, index) => (
                  <li key={`${index}`} className='border-b p-2'>
                    {getDayName(forecast.dt)}
                  </li>
                ))}
              </ul>
              <ul className='text-md w-1/2 text-md flex flex-col gap-1 text-center'>
                {forecastData.map((forecast, index) => (
                  <li key={`date-${index}`} className='border-b p-2'>
                    {formatDate(forecast.dt)}
                  </li>
                ))}
              </ul>
              <ul className='text-md w-1/6 flex flex-col gap-1 text-center'>
                {forecastData.map((forecast, index) => (
                  <li key={`icon-${index}`} className='border-b p-2'>
                    <img 
                      className='w-6' 
                      src={getWeatherIcon(forecast.weather[0].icon)} 
                    />
                  </li>
                ))}
              </ul>
              <ul className='text-md w-1/6 flex flex-col gap-1 text-center'>
                {forecastData.map((forecast, index) => (
                  <li key={`temp-${index}`} className='border-b p-2'>
                    {Math.round(forecast.main.temp)}&deg;C
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center p-4">No forecast data available</div>
          )}
        </div>
      </div>
      
      <div className='today-highlights flex flex-col gap-10'>
        <div className='text-white bg-white/5 shadow-xl p-4 w-[950px] rounded-3xl flex flex-col'>
          <span className='text-2xl font-bold p-2'>Today's Highlights</span>
          <div className='flex gap-5'>
            
            <div className='sunrise-sunset flex'>
              <div className='text-white bg-white/5 shadow-xl p-3 my-3 px-6 rounded-3xl flex flex-col'>
                <span className='p-2'>Sunrise & sunset</span>
                {weatherData && (
                  <div className='gap-10 my-1'>
                    <span className='p-1 my-1 flex gap-4 text-3xl items-center'>
                      <img className='invert' height={50} width={50} src="/imageicon/sunrise.png" alt="sunrise" />
                      {formatTime(weatherData.sys.sunrise)}
                    </span>
                    <span className='p-1 my-1 px-3 flex gap-4 text-3xl items-center'>
                      <img className='invert' height={40} width={40} src="/imageicon/sunset.png" alt="sunset" />
                      {formatTime(weatherData.sys.sunset)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className='wind-humidity-feels-visibility flex'>
              <div className='text-white bg-white/5 shadow-xl p-3 my-3 px-6  rounded-3xl flex flex-col'>
                {weatherData && (
                  <ul className='flex gap-14 px-7'>
                    <li className='flex flex-col gap-4 text-center my-2'>
                      <span>Wind</span>
                      <img height={55} width={55} className='invert' src="/imageicon/windy.png" alt="wind" />
                      <span>{Math.round(weatherData.wind.speed)} km/h</span>
                    </li>
                    <li className='flex flex-col gap-4 text-center my-2'>
                      <span>Humidity</span>
                      <img height={55} width={55} className='invert' src="/imageicon/humidity.png" alt="humidity" />
                      <span>{weatherData.main.humidity}%</span>
                    </li>
                    <li className='flex flex-col gap-4 text-center my-2'>
                      <span>Visibility</span>
                      <img height={55} width={55} className='invert' src="/imageicon/visibility.png" alt="visibility" />
                      <span>{(weatherData.visibility / 1000).toFixed(2)} km</span>
                    </li>
                    <li className='flex flex-col gap-4 text-center my-2'>
                      <span>Pressure</span>
                      <img height={55} width={55} className='invert' src="/imageicon/pressure.png" alt="pressure" />
                      <span>{weatherData.main.pressure} hPa</span>
                    </li>
                    <li className='flex flex-col gap-4 text-center my-2'>
                      <span>Feels&nbsp;like</span>
                      <img height={55} width={55} className='invert' src="/imageicon/feels-like.png" alt="feels like" />
                      <span>{Math.round(weatherData.main.feels_like)}&deg;c</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='timelines my-2'>
          <div className='text-white bg-white/5 shadow-xl p-4 w-[950px] rounded-3xl flex flex-col'>
            <span className='text-2xl font-bold p-2'>Today at</span>
            
            {hourlyForecastData && hourlyForecastData.length > 0 ? (
              <ul className='flex gap-5 mx-auto px-5 overflow-x-auto'>
                {hourlyForecastData.map((forecast, index) => (
                  <li key={`hour-${index}`} className='text-center'>
                    <div className='text-white bg-white/5 shadow-xl p-3 my-3 px-6 rounded-3xl flex flex-col py-5'>
                      {formatTime(forecast.dt)}
                      <img className='justify-center py-2 ' width={50} height={50} src={getWeatherIcon(forecast.weather[0].icon)}/>
                      {Math.round(forecast.main.temp)}&deg;c
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center p-4">No hourly forecast data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager

