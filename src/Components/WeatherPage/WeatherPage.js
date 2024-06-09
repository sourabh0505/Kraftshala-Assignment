import React, { useState, useEffect } from "react";
import "./weatherPage.css";

function WeatherPage() {
  // State to store weather data
  const [weatherData, setWeatherData] = useState("");

  // State to store the location input by the user
  const [location, setLocation] = useState("");

  // State to toggle between light and dark themes
  const [theme, setTheme] = useState('light');

  // State to store the current location's name
  const [currentLocation, setCurrentLocation] = useState("");

  // State to store the current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  // Function to fetch weather data based on the user's input location
  const fetchData = async () => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e94203882f1068d1f5dfefcbb4d365cd`;
    try {
      const fetchedData = await fetch(apiURL);
      const response = await fetchedData.json();
      setWeatherData(response);
    } catch (error) {
      throw new Error("Unable to fetch the weather data:", error);
    }
    setLocation('');
  };

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // UseEffect to fetch weather data for the current location using geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e94203882f1068d1f5dfefcbb4d365cd`
          )
            .then((response) => response.json())
            .then((data) => {
              setCurrentLocation(data.name);
              setWeatherData(data);
            })
            .catch((error) => console.error('Error fetching weather data:', error));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // UseEffect to update the current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // UseEffect to apply the selected theme to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="weatherpage-container">
      <div className="weather-app-heading">
        <img src="./Images/weather-icon.svg" alt="app-icon" />
        <h1 className={theme === 'light' ? "heading" : 'heading-dark'}>WeatherForecast</h1>
        <button className={theme === 'light' ? "toggleBtn" : 'toggleBtn-dark'} onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} Mode</button>
      </div>

      <div className="search-weather">
        <input
          type="text"
          placeholder="Type the city here..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className={theme === 'light' ? "show-btn" : 'show-btn-dark'} onClick={fetchData}>Show</button>
      </div>

      <div className={theme === 'light' ? "city-name": 'city-name-dark'}>
        <h1>
          {weatherData?.name ? weatherData?.name?.toUpperCase() : 'City'}, {weatherData?.sys ? weatherData?.sys?.country : 'Country'}
        </h1>
      </div>

      <div className="current-info">
        <div className={theme === 'light' ? 'current-location' : 'current-location-dark'}>Current Location: {currentLocation}</div>
        <div className={theme === 'light' ? "date-time" : "date-time-dark"}>Date and Time: {currentDateTime}</div>
      </div>

      <div className={theme === 'light' ? "city-weather-forecast" : "city-weather-forecast-dark"}>   
        {weatherData.weather ? <h1>{weatherData?.weather[0]?.main}</h1> : '--'}
      </div>

      <div className="weather-information">
        <div className={theme === 'light' ? "city-temperature": 'city-temperature-dark'}>
          <h1>Temperature</h1>
          <h2>{weatherData?.main ? weatherData?.main?.temp : '--'} °F</h2>
        </div>

        <div className={theme === 'light' ? "city-feels-like-temp": 'city-feels-like-temp-dark'}>
          <h1>Feels Like</h1>
          <h2>{weatherData?.main ? weatherData?.main?.feels_like : '--'} °F</h2>
        </div>

        <div className={theme === 'light' ? "city-humidity": 'city-humidity-dark'}>
          <h1>Humidity</h1>
          <h2>{weatherData?.main ? weatherData?.main?.humidity : '--'} %</h2>
        </div>

        <div className={theme === 'light' ? "city-wind-speed": 'city-wind-speed-dark'}>
          <h1>Wind Speed</h1>
          <h2>{weatherData?.wind ? weatherData?.wind?.speed : '--'} MPH</h2>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
