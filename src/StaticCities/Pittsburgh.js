import '../App.css';
import React, {useState, useEffect} from "react"
import {getFormattedWeatherData} from '../services/weatherService'


function Pittsburgh({metric2}) {


      //state for controlling our °F and °C
      const [units, setUnits] = useState(metric2)
      const [pcity, setPcity] = useState('pittsburgh')
      const [pweather, setPweather] = useState('null')

      useEffect(() => {
        const FetchWeatherData = async () => {
        const data = await getFormattedWeatherData(pcity, units)
        console.log(data)
        // console.log(data.temp.toFixed())
        data.temp = data.temp.toFixed()
        setPweather(data)
        };
        
    
        FetchWeatherData()
        //This will only refresh the variable that are selected, which in this example are the units
        //and the location
      }, [pcity, units]);


  return (
<div className='section section__temperature2'>
            <div className='icon2'>
              <h3>{`${pweather.name}, ${pweather.country}`}</h3>
              <img src={pweather.iconURL} alt="weatherIcon2"/>
              <h3>{`${pweather.description}`}</h3>
            </div>
            <div className='temperature2'>
              <h1>{pweather.temp}° {units === 'metric' ? 'C' : 'F'}</h1>
            </div>
          </div>
  )
}

export default Pittsburgh