import '../App.css';
import React, {useState, useEffect} from "react"
import {getFormattedWeatherData} from '../services/weatherService'


function Detroit({metric2}) {


      //state for controlling our °F and °C
      const [units, setUnits] = useState(metric2)
      const [dcity, setDcity] = useState('detroit')
      const [dweather, setDweather] = useState('null')

      useEffect(() => {
        const FetchWeatherData = async () => {
        const data = await getFormattedWeatherData(dcity, units)
        console.log(data)
        // console.log(data.temp.toFixed())
        data.temp = data.temp.toFixed()
        setDweather(data)
        };
        
    
        FetchWeatherData()
        //This will only refresh the variable that are selected, which in this example are the units
        //and the location
      }, [dcity, units]);


  return (

<div className='section section__temperature2'>
            <div className='icon2'>
              <h3>{`${dweather.name}, ${dweather.country}`}</h3>
              <img src={dweather.iconURL} alt="weatherIcon2"/>
              <h3>{`${dweather.description}`}</h3>
            </div>
            <div className='temperature2'>
              <h1>{dweather.temp}° {units === 'metric' ? 'C' : 'F'}</h1>
            </div>
          </div>
  )
}

export default Detroit