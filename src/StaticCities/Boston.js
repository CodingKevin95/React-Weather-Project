import '../App.css';
import React, {useState, useEffect} from "react"
import {getFormattedWeatherData} from '../services/weatherService'


function Boston({metric2}) {


      //state for controlling our °F and °C
      const [units, setUnits] = useState(metric2)
      const [bcity, setBcity] = useState('boston')
      const [bweather, setBweather] = useState('null')

      useEffect(() => {
        const FetchWeatherData = async () => {
        const data = await getFormattedWeatherData(bcity, units)
        console.log(data)
        data.temp = data.temp.toFixed()
        setBweather(data)
        };
        
    
        FetchWeatherData()
        //This will only refresh the variable that are selected, which in this example are the units
        //and the location
      }, [bcity, units]);

  return (

          <div className='section section__temperature2'>
            <div className='icon2'>
              <h3>{`${bweather.name}, ${bweather.country}`}</h3>
              <img src={bweather.iconURL} alt="weatherIcon2"/>
              <h3>{`${bweather.description}`}</h3>
            </div>
            <div className='temperature2'>
              <h1>{bweather.temp}° {units === 'metric' ? 'C' : 'F'}</h1>
            </div>
          </div>
  )
}

export default Boston