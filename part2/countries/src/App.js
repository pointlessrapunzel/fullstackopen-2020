import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList = ({ countries }) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <div>
          capital {country.capital}
          <br />
          population {country.population}
        </div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(lang => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>
        <img style={{'maxWidth': '100px'}} src={country.flag} />
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <ul style={{'listStyle': 'none', 'padding': '0'}}>
        {countries.map(c => <li key={c.alpha3Code}>{c.name}</li>)}
      </ul>
    )
  }
  return <p>Too many matches, specify another field</p>
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

  return (
    <div className="App">
      find countries
      <input value={filter} onChange={e => setFilter(e.target.value)}></input>
      <CountriesList countries={shownCountries} />
    </div>
  );
}

export default App;
