# Kraftshala Assignment - Weather Application

This is a simple weather application built with React that fetches weather data using the OpenWeather API. The application includes features to display current weather information for a specified location, toggle between light and dark themes, and show the current location's weather based on geolocation.

## Features

- Fetch and display weather data for a user-specified location like humidy, wind speed, temperature and feels-like temperature.
- Show current weather data for the user's geolocation.
- Toggle between light and dark themes.
- Display current date and time.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. **Install dependencies**:

    Using npm:
    ```bash
    npm install
    ```

    Using yarn:
    ```bash
    yarn install
    ```

 3. **Start the development server**:

    Using npm:
    ```bash
    npm start
    ```

    Using yarn:
    ```bash
    yarn start
    ```

4. **Open your browser and navigate to `http://localhost:3000`**.

## Project Structure

  - `public/`: Contains static assets.
  - `src/`: Contains the source code.
  - `components/`: Contains the React components.
  - `App.js`: Main application component.
  - `index.js`: Entry point of the application.
  - `weatherPage.css`: CSS file for styling the application.
  - `WeatherPage.js` : Contains complete UI logic and API integration logic for fetching the data and displaying it.

## Usage

1. **Search for a city**:
    - Enter a city name in the input field and click the "Show" button to fetch and display weather data for the specified city.

2. **View current location's weather**:
    - The application will automatically fetch and display weather data for your current geolocation on load.

3. **Toggle theme**:
    - Click the "Dark Mode" or "Light Mode" button to switch between light and dark themes.
