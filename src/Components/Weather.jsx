import { MdLocationPin } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useState } from "react";
import "./style.css";
function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const APIKey = "3d29dcbf1faf7fcc52111acf66910762";

    if (city === "") {
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(json);
          console.log(json)
        }
      })
  }
  return (
    <div className="container">
      <div className="search_box ">
        <MdLocationPin className="pin" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your location "
        />
        <button className="btn" onClick={handleSearch}>
          <RxMagnifyingGlass className="glass" />
        </button>
      </div>
    
        {error && <div className="not_found">City not found</div>}

        {weatherData && (
          <div className="weather_box">
            <img
              src={`svg/${weatherData.weather[0].main.toLowerCase()}.png`}
              alt={weatherData.weather[0].main}
            />
            <div className="temperature">
              {parseInt(weatherData.main.temp)}
              <span>°C</span>
            </div>
            <div className="description">
              {weatherData.weather[0].description}
            </div>
            <div className="weather_details">
              <div className="humidity">
                Humidity: <span>{weatherData.main.humidity}%</span>
              </div>
              <div className="wind">
                Wind: <span>{parseInt(weatherData.wind.speed)} Km/h</span>
              </div>
            </div>
          </div>
        )}
     
    </div>
  );
}

export default Weather;