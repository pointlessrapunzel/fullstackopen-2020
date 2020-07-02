import React from 'react'

const Country = ({country}) => {
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
      <img style={{'maxWidth': '100px'}} src={country.flag} alt={`Flag of ${country.name}`} />
    </div>
  )
}

export default Country