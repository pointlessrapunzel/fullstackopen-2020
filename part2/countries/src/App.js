import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesList = ({ countries }) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <Country country={country} isShown={true} />
    )
  } else if (countries.length <= 10) {
    return (
      <ul style={{'listStyle': 'none', 'padding': '0'}}>
        {countries.map(c => 
          <Country key={c.alpha3Code} country={c}/>
        )}
      </ul>
    )
  }
  return <p>Too many matches, specify another field</p>
}

const Country = ({ country, isShown = false }) => {
  const [shown, setShown] = useState(isShown)
  const handleShown = () => setShown(!shown)

  if (!shown) return (
    <div>
      {country.name} <button onClick={handleShown}>show</button>
    </div>
  )

  return (
    <div style={{'margin': '30px 0'}}>
      <div>
        <h2 style={{'display': 'inline'}}>{country.name}</h2>
        <button onClick={handleShown}>hide</button>
      </div>
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
