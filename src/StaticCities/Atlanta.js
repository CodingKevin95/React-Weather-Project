import '../App.css';
import React, {useState, useEffect} from "react"
import {getFormattedWeatherData} from '../services/weatherService'


function Atlanta({metric2}) {


      //state for controlling our °F and °C
      const [units, setUnits] = useState(metric2)
      const [acity, setAcity] = useState('atlanta')
      const [aweather, setAweather] = useState('null')

      useEffect(() => {
        const FetchWeatherData = async () => {
        const data = await getFormattedWeatherData(acity, units)
        console.log(data)
        // console.log(data.temp.toFixed())
        data.temp = data.temp.toFixed()
        setAweather(data)
        };
        
    
        FetchWeatherData()
        //This will only refresh the variable that are selected, which in this example are the units
        //and the location
      }, [acity, units]);


  return (

<div className='section section__temperature2'>
            <div className='icon2'>
              <h3>{`${aweather.name}, ${aweather.country}`}</h3>
              <img src={aweather.iconURL} alt="weatherIcon2"/>
              <h3>{`${aweather.description}`}</h3>
            </div>
            <div className='temperature2'>
              <h1>{aweather.temp}° {units === 'metric' ? 'C' : 'F'}</h1>
            </div>
          </div>

  )
}

export default Atlanta