import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Sovellus toimii noin puolet ajasta. Sen monta tuntia tätä kuitenkin väsäsin
// että en enää jaksanut virheenmallintaa pureutua. Se kun ilmeisesti käsitellään 
// kurssillakin vasta myöhemmin. 

const App = () => {
    const [searchInput, setSearchInput] = useState('')
    const [countries, setCountries] = useState([])
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))
    const [weatherData, setWeatherData] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY


    const handleSearchInputChange = (event) => {
        console.log(event.target.value)
        setSearchInput(event.target.value)
        console.log(filteredCountries)
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get(`https://restcountries.eu/rest/v2/all`)
            .then(response => {
                console.log('axios workkii')
                setCountries(response.data)
                console.log(countries)
            })

    }, [])

    return (
        <div>
            <Search searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} />
            <Results searchInput={searchInput} filteredCountries={filteredCountries} setSearchInput={setSearchInput} apiKey={apiKey} setWeatherData={setWeatherData} weatherData={weatherData} />
        </div>
    )
}

const Search = ({ searchInput, handleSearchInputChange }) => {
    return (
        <div>
            <label>find countries</label><input value={searchInput} onChange={handleSearchInputChange} />
        </div>
    )
}

const Results = ({ setSearchInput, filteredCountries, apiKey, setWeatherData, weatherData }) => {
    if (filteredCountries.length > 10) {
        return (<p>Too many matches</p>)
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (<ul>
            {filteredCountries.map(country => <CountryListElement setSearchInput={setSearchInput} country={country} key={country.alpha3Code} />)}
        </ul>)
    } else if (filteredCountries.length === 1) {
        return (<div><ShowOne country={filteredCountries[0]} apiKey={apiKey} setWeatherData={setWeatherData} weatherData={weatherData} /></div>)
    } else {
        return (<div></div>)
    }
}

const CountryListElement = ({ country, setSearchInput }) => {
    const handleShowClick = () => {
        setSearchInput(country.name)
    }

    return (<li key={country.alpha3Code}>
        {country.name}
        <button onClick={handleShowClick}>show</button>
    </li>)
}

const ShowOne = ({ country, apiKey, setWeatherData, weatherData }) => {

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
            .then(response => {
                console.log(response.data, 'got weather data')
                setWeatherData(response.data)
                console.log(weatherData)
            })
    }, [])
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital} </p>
            <p>population: {country.population}</p>
            <h3>languages:</h3>
            <ul>
                {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='pic' width='100px' />
            <h3>Weather in {country.capital}</h3>
            <p><b>temperature:</b> {weatherData.current.temperature} Celsius</p>
            <img src={weatherData.current.weather_icons[0]} alt='saakuva' width='80px' />
            <p><b>wind:</b>{weatherData.current.wind_speed} mph, direction: {weatherData.current.wind_dir}</p>
        </div>
    )
}

export default App