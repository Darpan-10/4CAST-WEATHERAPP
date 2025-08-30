import { createContext, useState, useContext, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('kolkata');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState(null); 
  
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async () => {
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Error: City not found ');
    }
    const data = await response.json();
    setWeatherData(data);
    await fetchForecastData();

  };

  const fetchForecastData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Error: Forecast data not available');
    }
    const data = await response.json();

    const dailyForecasts = processDailyForecasts(data.list);
    setForecastData(dailyForecasts);

    const hourlyForecasts = processHourlyForecasts(data.list);
    setHourlyForecastData(hourlyForecasts);
   
  };

 const processDailyForecasts = (List) => {
  const today = new Date().getDate();
  const dailyForecasts = [];
  
  List.map(item => {
    const date = new Date(item.dt * 1000);
    if (date.getDate() === today) return;
    
    const dateKey = date.toDateString(); 
    
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = item; 
    }
  });
  
  return Object.values(dailyForecasts).slice(0, 5);
};

  const processHourlyForecasts = (List) => {
   
    const today = new Date().getDate();
    const hourlyData = [];
    
    List.map(item => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();
      
      if (day === today) {
        hourlyData.push(item);
      }
    });
    
    return hourlyData.slice(0, 6);
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <WeatherContext.Provider value={{ 
      weatherData, 
      forecastData, 
      hourlyForecastData,   
      city, 
      setCity 
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);