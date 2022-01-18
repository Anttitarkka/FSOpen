import React, { useState , useEffect} from 'react'
import "./styles.css";
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const ListElement = ({name}) => {
    return (
      <li>{name}</li>
    )
  }
  
  const Button = ({ handleClick, text, name}) => (
    <button onClick={() => handleClick(name)}>
      {text}
    </button>
    )
  
  const ListedCountry = ({handleClick, text, name}) => {
    return (
      <li>
        {name} <Button handleClick={handleClick} text={text} name={name}/>
      </li>
    )
  }
  
  
  const Country = ({name, capital, area, languages, flagPic}) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                console.log(response)
                setWeather(response.data.current)})
        return () => setWeather({})
    }, [capital])

    return (
      <div>
        <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>area {area} (km^2)</p>
        <h3>languages</h3>
        <ul>
          {languages.map(language =>
            <ListElement key={language} name={language}/>)}
        </ul>
        <br></br>
        <img src={flagPic} alt="Country flag not found" className="flag"/>
        {Object.keys(weather).length !== 0 && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p><b>temperature:</b> {weather.temperature} Celcius</p>
                    <img
                        src={weather.weather_icons[0]}
                        alt={weather.weather_descriptions}
                    />
                    <p>
                        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
                    </p>
                </>
            )}
      </div>
    )
  }
  
  const Display = ({countriesToShow, handleClick}) => {
    console.log("apina avain")
    console.log(api_key)
    if (countriesToShow.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countriesToShow.length >= 2 && countriesToShow.length <= 10) {
      return (
        <ul>{countriesToShow.map(country => 
            <ListedCountry key={country.name.common} handleClick={handleClick} text={'show'} name={country.name.common}/>
          )}
        </ul>)
    } else if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      return (
        <div>
          <Country key={country.name.common} name={country.name.common} capital={country.capital[0]}
          area={country.area} languages={Object.values(country.languages)} flagPic={country.flags.png}/>
        </div>)
    } else {
      return (
        <p>No matches found...</p>
      )
    }
  }

export default Display