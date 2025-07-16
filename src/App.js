// App.js
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [wdetails, setWDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const getData = (event) => {
    event.preventDefault();
    if (!city.trim()) return;
    
    setIsLoading(true);
    setSearched(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === '404') {
          setWDetails(undefined);
        } else {
          setWDetails(finalRes);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setIsLoading(false);
        setWDetails(undefined);
      });

    setCity('');
  };

  useEffect(() => {
    console.log("React App Mounted");
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-box">
        <h1 className="title">🌤️ Weather App</h1>

        <form onSubmit={getData} className="form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Search</button>
        </form>

        <div className="weather-details">
          {isLoading && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/28/InternetSlowdown_Day.gif"
              className="loader"
              alt="Loading..."
            />
          )}

          {searched && !isLoading && (
            wdetails ? (
              <>
                <h2>
                  {wdetails.name}, <span>{wdetails.sys.country}</span>
                </h2>
                <h3>{wdetails.main.temp}°C</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${wdetails.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>{wdetails.weather[0].description}</p>
                <p>Humidity: {wdetails.main.humidity}%</p>
                <p>Wind: {wdetails.wind.speed} m/s</p>
              </>
            ) : (
              <h3>No city found. Please try again.</h3>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
