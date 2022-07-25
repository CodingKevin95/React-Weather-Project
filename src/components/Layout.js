import {Route, Routes, NavLink} from 'react-router-dom';
import About from './MainCitiesLayout';
import Homepage from './Homepage'
import NoMatch from './NoMatch'
import Forecast from './Forecast';
import { useState } from 'react';

//NavLink and Link are almost the same, the difference is that
//you can style in NavLink.


function Layout () {
    const [select ,setSelect] = useState('')
    const [metric, setMetric] = useState('')
    const [color, setColor] = useState('')

    return (
        <div>
            <nav className='nav'>
                <NavLink className="main-nav" to={'/'} >Home</NavLink>
                <NavLink className="main-nav" to={'/Forecast'} >Forecast</NavLink>
                <NavLink className="main-nav" to={'/StaticCities'} >Main Cities</NavLink>
            </nav>

            <Routes>
                <Route path="/" element= {<Homepage setSelect= {setSelect} setMetric={setMetric} setColor={setColor}/>}/>
                <Route path="/StaticCities" element= {<About metric={metric} color={color}/>}/>
                <Route path="/Forecast" element= {<Forecast select = {select} metric={metric} color={color}/>}/>
                <Route path="/*" element= {<NoMatch />}/>
            </Routes>

        </div>
    )
}

export default Layout