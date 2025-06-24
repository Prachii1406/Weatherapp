import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [wdetails, setWDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [counter, setCounter] = useState(1);

  const getData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSearched(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
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

  const changeCounter = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    console.log("Welcome to React");
  }, [counter]);

  return (
    <div className='weatherdiv'>
      {/* {counter} */}
      {/* <button onClick={changeCounter}>Count</button> */}

      <div>
        <h1>Simple Weather App</h1>
        <form onSubmit={getData}>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='w-[300px] h-[40px] pl-3'
            placeholder='City Name'
          />
          <button className='ml-2'>Search</button>
        </form>

        <div className='citydetails mt-4'>
          {isLoading && (
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/2/28/InternetSlowdown_Day.gif'
              className='loadimg'
              alt='Loading...'
            />
          )}

          {searched && (
            wdetails !== undefined ? (
              <>
                <h3>{wdetails.name}, <span>{wdetails.sys.country}</span></h3>
                <h2>{wdetails.main.temp} °C</h2>
                <img
                  src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}
                  alt='Weather Icon'
                />
                <p>{wdetails.weather[0].description}</p>
              </>
            ) : (
              <h2>No City Found</h2>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
