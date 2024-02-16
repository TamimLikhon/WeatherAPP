import React, { useState,useEffect } from "react";
import "./App.css";

import { BsSearch } from "react-icons/bs";

import Uv from "../Images/sun-regular.svg";
import Temp from "../Images/temperature-full-solid.svg";
import Humi from "../Images/droplet-solid.svg";
import wind from "../Images/wind-solid.svg";
import air from "../Images/pressure2.webp";
import visib from "../Images/eye-solid.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import {AiFillSetting} from "react-icons/ai";


const api = {
  base: "https://api.weatherapi.com/v1/forecast.json",
  key: "b8bfebd738864adaada33820230211",
};

export default function App() {
  const [search, setSearch] = useState("Dhaka");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([ ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
 
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
 


  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  }
  const ButtonClick = () => {
    fetch(`${api.base}?q=${search}&days=7&hour=24&key=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setForecast(result.forecast.forecastday);
        console.log(setForecast);

          
        
        const isDay = result.current.condition.icon.includes('day');
  
        // Apply the appropriate background image
        const card = document.querySelector('.Card');
       
        const screen = document.querySelector('.canvas');
          
          if (isDay) {
            screen.style.backgroundImage = 'url("../Images/sunset.jpg")';

          } else {
            screen.style.backgroundImage = 'url("../Images/night.jpg")';
          }
        if (isDay) {
          card.style.backgroundImage = 'url("../Images/after_noon.png")';
        } else {
          card.style.backgroundImage = 'url(../Images/night-background.jpg)';
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  };
  

  
  
    useEffect(() => {
      ButtonClick();
  
}, [])
  return (
    <div className="canvas">
     
    <a target="_blank" href="https://www.weatherapi.com/weather/">
      Api Provided By Weather
    </a>
    <h1>Weather Web</h1>

  
    <div className={`settings-button-container ${isSettingsOpen ? 'open' : ''}`}>
      <button className="settings-button" onClick={handleSettingsClick}>
        <span>{<AiFillSetting size={32}/>}</span>
      </button>

      <div className={`settings-overlay ${isSettingsOpen ? 'open' : ''}`}>
        <div className="settings-window">
          <div className="settings-content">
          
            
            <div className="setting-content-button-extra">

            <input type="text"  onChange={(e) => setSearch(e.target.value)} /> 
            <button onClick={ButtonClick}> Change Location  </button>

            
            </div>
           
            <button className="setting-content-button" onClick={handleSettingsClick}> Save 
            </button>
          </div>
        </div>
      </div>
    </div>
   
      
      {weather.location ? (
        
        <div className="search">
          <div className="Card">
          <div className="info">
            <div className="time">
            <p> {formattedDate} </p>
          <p>{weather.location.name},{weather.location.country} </p>
            </div>
          <div className="weather-info">
          <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text}  />
          <p>  {weather.current.temp_c}°C </p>
          </div>

          <div className="weather-info-text">
          <p>  {weather.current.condition.text}      </p>
          <p> Feels Like: {weather.current.feelslike_c}°C </p>
          </div>
          
          </div>
          
          <div className="extra-weather-info">
          
          <div className="UV">
          <img src={Uv} /> 
          <h3> UV </h3>
          <p>{weather.current.uv}</p>             
          </div>

          <div className="feels-like">
          <img src={Temp} />
          <h3> Feels </h3>
          <p>{weather.current.feelslike_c}°C </p>
          </div>

          <div className="humidity">
          <img src={Humi} /> 
          <h3> Humidity </h3>
          <p>{weather.current.humidity} % </p>
          </div>
                                                                         
           <div className="wind-speed">
          <img src={wind} /> 
          <h3> Wind Speed </h3>
          <p>{weather.current.wind_kph}km/h </p>
          </div>

          <div className="air-pressure">
          <img src={air} /> 
          <h3> Air-Pressure </h3>
          <p>{weather.current.pressure_mb}hpa </p>
          </div>

          <div className="visibility">
          <img src={visib} /> 
          <h3> Visibility </h3>
          <p>{weather.current.vis_km} km </p>
          </div>
          </div>
          

        
        
        <div className="forcast">
          <h3> 7 Days Weather Forecast</h3>
        {forecast.map((day, index) => (
          <div className="day-forecast" key={index}>
      <p>{formatDate(day.date)}</p>
      <p>{day.day.condition.text}</p>
      <p>{day.day.maxtemp_c} / {day.day.mintemp_c} °C</p>
      
      <img
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
      />


         
    </div>
  ))}


          </div>
           

          </div> 
          </div> 
      ) : (
        ""
        )}
          </div>
  );
  
}
