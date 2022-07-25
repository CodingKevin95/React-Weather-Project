// import { useSearchParams } from "react-router-dom"
import { DateTime } from "luxon"

const API_KEY = "a1cacbf933c3b5736c73b585f7cb8394"
const BASE_URL = "https://api.openweathermap.org/data/2.5"


const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`



export const getFormattedWeatherData = async (city, units = "metric") => {
    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    console.log(data);
    // console.log(URL)

    //Destructured
    const {weather, main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
wind: {speed}, sys: {country}, name} = data;

const {description, icon} = weather[0]

return {
    description, iconURL: makeIconURL(icon), temp, feels_like, temp_min, temp_max, pressure, humidity,country,
    speed, name,
};
}




export const getWeatherData = (infoType, searchParmas) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParmas, appid:
        API_KEY})
        console.log(url.s)
    return fetch(url).then((res) => res.json())
}

 //Destructured
const formatCurrentWeather = (data) => {
    const {
    coord: {lat, lon},
    main: {temp},
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather
} = data; 

const {main: details, icon} = weather[0]

return {lat, lon, name, dt, country, sunrise, sunset, temp, details, icon, weather}
}

const formatForecastWeather= (data) => {
    let { timezone, daily, hourly} = data;
    //slice to ignore the current day
    daily = daily.slice(1,7).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })
    //slice to ignore the current hour
    hourly = hourly.slice(1,13).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'h:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })

    return {timezone, daily, hourly}
}

 export const getFormattedWeatherData2 = async (searchParmas) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParmas).then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'currently, minutely, alerts', units: searchParmas.units,
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}

// This helps display the correct format for the forecast page
export const formatToLocalTime = (secs, zone, format = "ccc, dd LLL yyyy' | Local time: 'h:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

export const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`