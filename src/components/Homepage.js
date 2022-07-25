import '../App.css';
import React, {useState, useEffect} from "react"
import { Descriptions } from './Descriptions';
import {getFormattedWeatherData} from '../services/weatherService'
import hot from "../services/hot.png"

function Homepage({setSelect, setMetric, setColor}) {

  //state for controlling our city that we selected
  const [city, setCity] = useState("boston")
  setSelect(city)
  //state for controlling our weather data/descriptions
  const [weather , setWeather] = useState(null)
  //state for controlling our °F and °C
  const [units, setUnits] = useState("imperial")
  setMetric(units)
  const [bg, setBg] = useState("")
  setColor(bg)

//Fetching data from our services and only allow certain conponents to be refreshed
//when being called
  useEffect(() => {
    const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units)
    console.log(data)
    setWeather(data)

    // const thershold = units ==='metric' ? 20 : 86;
    // if (data.temp <= thershold) setBg("lightgrey");
    // else setBg("lightred")

    // const thershold = data.description =='clear sky'
    if (data.description == 'clear sky') setBg("rgba(238,247,141,.5)"); //Orange
    else if (data.description =='few clouds') setBg("rgba(238,247,141,.0.5)") //Yellow
    else if (data.description =='scattered clouds') setBg("rgba(183, 182, 181, 0.45)") //Light Grey
    else if (data.description =='overcast clouds') setBg("rgba(183, 182, 181, 0.45)") //Light Grey
    else if (data.description =='broken clouds') setBg("rgba(183, 182, 181, 0.45)") // Light Grey
    else if (data.description =='rain') setBg("rgba(68, 68, 68, 0.45)") //Dark Grey
    else if (data.description =='thunderstorm') setBg("rgba(68, 68, 68, 0.45)") //Dark Grey
    else if (data.description =='snow') setBg("rgba(50, 87, 248, 0.45)") // Light Blue
    else if (data.description =='mist') setBg("rgba(99, 114, 179, 0.45)") // Reg Blue
    };

    fetchWeatherData()
//Everytime we get new data in units(change from °F to °C) or change new city the data will refresh 
//and convert all the number calculations
  }, [units, city]);


//This will store the data/input locally so that we can switch from our search and forecast
//page without our pages refreshing the data
  useEffect(() => {
    const data = window.localStorage.getItem('localCity');
    setCity(JSON.parse(data))
  }, [])

  useEffect(() => {
    const data = window.localStorage.getItem('localUnit');
    setUnits(JSON.parse(data))
  }, [])

  useEffect (() => {
    window.localStorage.setItem("localCity", JSON.stringify(city))
  }, [city,])

  useEffect (() => {
    window.localStorage.setItem("localUnit", JSON.stringify(units))
  }, [units])

//-----------------------------------------------------------------------

// This creates a function for our button to convert celsius to fahrenheit or the other way around
const HandleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsuis = currentUnit === 'C';
    button.innerText = isCelsuis ? "°F" : "°C"
    setUnits(isCelsuis ? 'metric' : 'imperial');
    console.log(button.innerText)
  }

  //Instead of the clicking enter, we can just press our 'return' or 'enter' button
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  // const handleClickCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let lat = position.coords.latitude;
  //       let lon = position.coords.longitude;


  //       console.log(lat)
  //       console.log(lon)
  //       setCity({
  //         lat,
  //         lon
  //       });
  //       console.log(setCity)
  //     })
  //   }
  // } 

    return(
        <div className="App" style= {{backgroundImage: `url(${hot})`}}>
          {/* <div className="App" style= {{backgroundColor: `${bg}`}}> */}
        <div className='overlay'>
        {
          weather && (
        <div className='container'>
        <div className='searchSection' style= {{backgroundColor: `${bg}`}}>
            <div className='section section__inputs'>
            {/* <div className='citySelection'> */}
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city"/>
                {/* <button type="submit" onClick={handleClickCurrentLocation} className='search'>Search</button> */}
            {/* </div> */}
            <button onClick={(e) => HandleUnitsClick(e)}>°C</button>
          </div>

          <div className='section section__temperature'>
            <div className='icon'>
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="weatherIcon"/>
              <h3>{`${weather.description}`}</h3>
            </div>
            <div className='temperature'>
              <h1 className='tempNumber'>{`${weather.temp.toFixed()}° ${units === 'metric' ? 'C' : 'F'}`}</h1>
            </div>
          </div>
          <Descriptions weather = {weather} units = {units}/>
        </div>
        </div>
          )
        }
      </div>
    </div>
    )}

export default Homepage