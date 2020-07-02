import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CountriesList from "./components/CountriesList";
import Country from './components/Country'


const CountryWithWeather = ({country}) => {
  const [weather, setWeather] = useState(false)

  useEffect(() => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country])

  return (
    <div>
      <Country country={country} />
      <h2>Weather in {country.capital}</h2>
      {!weather ? 'Loading...'
      : <div>
          <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
          <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]}></img>
          <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const shownCountries = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  const exactMatch = countries.find(c => c.name.toLowerCase() === filter.toLowerCase())

  return (
    <div className="App">
      find countries
      <input value={filter} onChange={e => setFilter(e.target.value)}></input>
      {shownCountries.length === 1 || exactMatch
        ? <CountryWithWeather country={exactMatch || shownCountries[0]} /> 
        : <CountriesList countries={shownCountries} />}
    </div>
  );
}

export default App;
