import './MainCitiesLayout.css';
import Boston from "../StaticCities/Boston"
import Atlanta from '../StaticCities/Atlanta';
import Detroit from '../StaticCities/Detroit';
import Pittsburgh from '../StaticCities/Pittsburgh'
import hot from "../services/hot.png"
import { useState } from 'react';


function About({metric, color}) {
    const [metric2, setMetric2] = useState(metric)
    console.log(metric2)
    const [bg] = useState(color)

return(
    <div className="aboutBg" style= {{backgroundImage: `url(${hot})`}}>
        
        <div className='staticContainer'>
            <div className='staticCity' style= {{backgroundColor: `${bg}`}}>
                <Boston metric2={metric2}/>
                <Atlanta metric2={metric2}/>
                <Detroit metric2={metric2}/>
                <Pittsburgh metric2={metric2}/>
            </div>
        </div>

    </div>
)

}

export default About