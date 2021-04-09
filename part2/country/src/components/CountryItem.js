import React, { useState,useEffect } from 'react';
import axios from 'axios';


//A information board of the Country
const CountryItem = ({ data }) => {

    const [show, setShow] = useState(false);

    const toggleVisibleState = () => {
        setShow(!show);
    }

    if (!show) {
        return (
            <div>
                <p>{data.name}
                    <button onClick={toggleVisibleState}>{show ? 'Fold' : 'Show'}</button>
                </p>
            </div>
        );
    }
    return (
        <div>
            <h2>
                {data.name}
                <button onClick={toggleVisibleState}>{show ? 'Fold' : 'Show'}</button>
            </h2>
            <p>capital:{data.capital}</p>
            <p>population:{data.population}</p>
            <CountryLanguages languages={data.languages} />
            <img src={data.flag} width="200" />
            <WeatherInfo data={data}/>
        </div>
    )
}

//language list of the Country
const CountryLanguages = ({ languages }) => {
    return (
        <div>
            <h3>Spoken Languages:</h3>
            <ul>
                {languages.map((lang) => (
                    <li >{lang.name}</li>
                ))}
            </ul>
        </div>
    );
}

//Weather info
const WeatherInfo = ({data}) => {

    const currentWeatherApi = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${data.name}`;

    const [weatherData,setWeatherData] = useState('');

    const fetchWeatherData = () => {
        console.log('weather api: ',currentWeatherApi);
        axios.get(currentWeatherApi)
            .then(response => {
                console.log('weather :',response.data);
                setWeatherData(response.data.current);
            });
    }

    useEffect(fetchWeatherData,[]);

    return(
        <div>
            <h3>Weather in {data.name}:</h3>
            <img src={weatherData.weather_icons}/>
        </div>
    );
}

export default CountryItem;