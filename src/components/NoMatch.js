import {Link} from 'react-router-dom'
import './NoMatch.css'
import hot from "../services/hot.png"


function NoMatch() {
    return (
        <div className='mainBody' style= {{backgroundImage: `url(${hot})`}}>
            <div className='errorMsg' >Sorry you're not suppose to be here,<br/>
            but while you're here click on the link to <br/>
            check out my other projects on GitHub <br/>
            <a href='https://github.com/CodingKevin95' target="_blank">Click Here</a>
            </div>
        </div>
    )
}
export default NoMatch