// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [searchCity, setSearchCity] = useState('');
//   const [cityData, setCityData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const API_KEY = 'f6ef39f9a1d94b98943165233232709'; // Replace with your actual API key

//   const handleSearch = async () => {
//     if (!searchCity.trim()) {
//       alert('Please enter a city name.');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}`);
//       const data = await response.json();

//       if (response.ok) {
//         setCityData(data);
//       } else {
//         alert('Failed to fetch weather data');
//       }
//     } catch (err) {
//       alert('Failed to fetch weather data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter city name"
//           value={searchCity}
//           onChange={(e) => setSearchCity(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {isLoading && <p className="loading">Loading data...</p>}

//       {cityData && (
//       <div className='weather-cards'>
//         <div className="weather-card">
//           <p>Temperature</p>
//           <p> {cityData.current.temp_c}°C</p>
//         </div>
//         <div className="weather-card">
//           <p>Humidity</p>
//           <p> {cityData.current.humidity}°C</p>
//         </div>
//         <div className="weather-card">
//           <p>Condition</p>
//           <p> {cityData.current.condition.text}°C</p>
//         </div>
//         <div className="weather-card">
//           <p>Wind Speed</p>
//           <p> {cityData.current.wind_kph}°C</p>
//         </div>
//       </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

const SearchBar = ({ onSearch}) => {
  const [searchvalue, setSearchValue] = useState("");
const handleSearch = () => {
  onSearch(searchvalue);
}

  return(<div className="search-bar">
    <input placeholder="Enter city name" type="text" value={searchvalue} onChange={(event) => {setSearchValue(event.target.value)}}/>
    <button onClick={handleSearch}>Search</button>
  </div>)
};

const WeatherCard = ({title, value}) =>{
  return(
    <div className="weather-card">
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
  )
}


const WeatherDisplay = ({city}) =>{
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(city){
      setIsLoading(true);
      axios.get(`https://api.weatherapi.com/v1/current.json`,{
        params:{
          key:"f6ef39f9a1d94b98943165233232709",
          q:city
        }
      }).then((response)=>{setWeatherData(response.data)})
      .catch((error)=>{ console.error("error fectching weather data"); alert('Failed to fetch weather data')})
      .finally(()=>{setIsLoading(false)})
    }
  },[city])

  return(
    <div className="weather-display">
        {isLoading && <p>Loading data...</p>}
        {!isLoading && weatherData && <div className="weather-cards">
            <WeatherCard title="Temperature" value={`${weatherData.current.temp_c}°C`}/>
            <WeatherCard title="Humidity" value={`${weatherData.current.humidity}%`}/>
            <WeatherCard title="Condition" value={`${weatherData.current.condition.text}`}/>
            <WeatherCard title="Wind Speed" value={`${weatherData.current.wind_kph} kph`}/>
          </div>}
    </div>
  )
}

export default function App(){
  const [city, setCity] = useState("");

  const handleSearch =(searchCity) =>{
    setCity(searchCity);
  }

  return(
    <div className="app">
      <SearchBar onSearch={handleSearch}/>
      <WeatherDisplay city={city}/>
    </div>
  )
}