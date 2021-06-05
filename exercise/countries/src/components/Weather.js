import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current
        ? access_key = 9dab35850481fd5b9a2e94ccf95a7af5
        & query = ${capital}`)
            .then(response => {
                setWeather(response.data)
            })
    },[capital])
    console.log(weather)
    if(!weather){
        console.log('nothing')
        return(
            <div></div>
        )
    }

    return(
        <div>
            <p><strong>temperature</strong> {weather.current.temperature} Celsius<br />
			<img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/></p>
			<p><strong>wind</strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}  </p>
		</div>		
    )

}
export default Weather

