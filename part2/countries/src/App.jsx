import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showDetails, setShowDetails] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setSearch(searchValue)

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredCountries(filtered)
    setShowDetails(null)
  }

  const handleShowDetails = (country) => {
    setShowDetails(country)
  }

  const displayCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, please refine your search.</p>
    } else if (filteredCountries.length > 1 && !showDetails) {
      return (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.ccn3}>
              {country.name.common} 
              <button onClick={() => handleShowDetails(country)}>Show</button>
            </li>
          ))}
        </ul>
      )
    } else if (filteredCountries.length === 1 || showDetails) {
      const country = showDetails || filteredCountries[0]
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
        </div>
      )
    }
    return <p>No matches found.</p>
  }

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        Find countries: <input value={search} onChange={handleSearchChange} />
      </div>
      {displayCountries()}
    </div>
  )
}

export default App