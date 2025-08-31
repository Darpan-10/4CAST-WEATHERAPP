# 🌤️ 4CAST Weather App  

A modern weather forecasting web application built with **React.js**, **Tailwind CSS**, **Firebase Authentication**, and the **OpenWeather API**.  
It provides real-time weather updates, a 5-day forecast, and detailed highlights such as temperature, wind speed, humidity, and pressure.  

---

## 🚀 Features  
- 🌍 Search weather by city  
- 🌡️ Real-time weather details (temperature, feels-like, conditions)  
- 📅 5-day forecast with weather icons  
- ⏰ Hourly weather updates  
- 🔑 Firebase authentication (Sign Up / Sign In)  
- 🎨 Modern responsive UI with Tailwind CSS  

---

## 🛠️ Tech Stack  
- **Frontend**: React.js (Vite)  
- **Styling**: Tailwind CSS  
- **Authentication**: Firebase Auth  
- **API**: [OpenWeather API](https://openweathermap.org/api)  

---

## ⚡ Setup Instructions (All in One)  

Follow these steps to run the project locally:  

```bash
# 1️⃣ Clone the repository
git clone git@github.com:Darpan-10/4CAST-WEATHERAPP.git
cd 4CAST-WEATHERAPP

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file in the root directory and add:
# (replace with your own API keys)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key

# 4️⃣ Run the development server
npm run dev
