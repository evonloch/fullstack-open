import React from 'react'
import Weather from './Weather'

const Country = ({ c }) => {
    return (
        <div>
            <h1>{c.name}</h1>
        capital: {c.capital}
            <br />
        population: {c.population}
            <br />
            <h2>Languages</h2>
            <ul>
                {c.languages.map(L => <li>{L.name}</li>)}
            </ul>
            <img src={c.flag} alt="" width="50" height="60" />
            <Weather capital = {c.capital}/>
        </div>
    )
}

export default Country