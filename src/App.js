import './App.css';
import { useState } from 'react';

function App() {
  const [searchCity, setSearchCity] = useState('');
  const [cityData, setCityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setIsLoading(true);
    const fetchData = async () =>{
      try{
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=f6ef39f9a1d94b98943165233232709&q=${searchCity}`)
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await res.json();
        setCityData(data);
        setIsLoading(false);
      }
      catch(ex){
          alert('Failed to fetch weather data');
      }
    }

    fetchData();    
  }


  return (
    <div>
      <div className='wrapper'>
      <input className='inpt' placeholder='Enter city name' value={searchCity} onChange={(e)=>{setSearchCity(e.target.value)}}/>
      <button className='btn' onClick={handleSearch}>Search</button>
      </div>
      {isLoading?(<p className='cardWrapper'>Loading Data...</p>):cityData && ( <div className='cardWrapper'>
        <div className='weather-card'>
          <h4>Temperature</h4>
          <div>{cityData.current.temp_c}°C</div>
        </div>
        <div className='weather-card'>
          <h4>Humidity</h4>
          <div>{cityData.current.humidity}%</div>
        </div>
        <div className='weather-card'>
          <h4>Condition</h4>
          <div>{cityData.current.condition.text}</div>
        </div>
        <div className='weather-card'>
          <h4>Wind Speed</h4>
          <div>{cityData.current.wind_kph} kph</div>
        </div>
      </div>)}
      
     
    </div>
  );
}

export default App;
