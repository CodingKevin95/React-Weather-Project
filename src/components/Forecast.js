import {getFormattedWeatherData2, formatToLocalTime, iconUrlFromCode} from '../services/weatherService'
import React, {useState, useEffect} from 'react'
import './Forecast.css'
import hot from "../services/hot.png"

function Forecast({select, metric, color}) {
    // console.log(items);

    const [query] = useState({q: select})
    const [units] = useState(metric)
    const [weather, setWeather] = useState(null)
    const [bg] = useState(color)
    console.log(bg)

    useEffect(() => {

        const fetchWeather = async () => {
            await getFormattedWeatherData2({...query, units}).then(data =>
                {
                    setWeather(data)
                })
            console.log(query)
        }
    
        fetchWeather()

    }, [query, units])

    console.log(weather)

    return (
        <div className='forecastFullPage' style= {{backgroundImage: `url(${hot})`}}>

            {weather && (
                <div className='forecastContainer'>
                    <div className='cityInfo' style= {{backgroundColor: `${bg}`}}>
                        <div className='topPart'>
                            <div className='topTop'>
                                <div className='topLeft'>
                                    <div>{weather.name}</div>
                                    <img 
                                    src={iconUrlFromCode(weather.icon)} alt = "weather icon"
                                    />
                                    <div>{weather.details}</div>   
                                </div>
                                    <h1 className='degree'>{weather.temp.toFixed()}° {units === 'metric' ? 'C' : 'F'}</h1>
                            </div>
                                <div className='timeDate'>{formatToLocalTime(weather.dt, weather.timezone)}</div>
                        </div>
                        <div className='line'></div>
                        <div className='ForecastContainer'>
                            <h3>Hourly Forecast</h3>
                            <div className='hourlyForecast'>
                            {weather.hourly.map((weathers, i) => (
                            <div key = {i} className='forecastBox'>
                                <p>{weathers.title}</p>
                                <img 
                                src={iconUrlFromCode(weathers.icon)}/>
                                <p className='forecastTemp'>{weathers.temp.toFixed()}° {units === 'metric' ? 'C' : 'F'}</p>
                            </div>
                            ))
                            }
                            </div>
                        <div className='line'></div>
                        </div>
                        <div className='ForecastContainer'>
                            <h3>Daily Forecast</h3>
                            <div className='hourlyForecast'>
                            {weather.daily.map((weathers, i) => (
                            <div key = {i} className='forecastBox'>
                                <p>{weathers.title}</p>
                                <img 
                                src={iconUrlFromCode(weathers.icon)}/>
                                <p className='forecastTemp'>{weathers.temp.toFixed()}° {units === 'metric' ? 'C' : 'F'}</p>
                            </div>
                            ))
                            }
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default Forecast