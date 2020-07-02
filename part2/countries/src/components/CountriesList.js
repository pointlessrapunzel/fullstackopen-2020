import React, { useState } from 'react'

import Country from "./Country";

const CountryListItem = ({ country, isShown = false }) => {
  const [shown, setShown] = useState(isShown)
  const handleShown = () => setShown(!shown)

  if (!shown) return (
    <div>
      {country.name} <button onClick={handleShown}>show</button>
    </div>
  )

  return (
    <div>
      <button onClick={handleShown}>hide</button>
      <Country country={country} />
    </div>
  )
}

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
          <CountryListItem key={c.alpha3Code} country={c}/>
        )}
      </ul>
    )
  }
  return <p>Too many matches, specify another field</p>
}

export default CountriesList