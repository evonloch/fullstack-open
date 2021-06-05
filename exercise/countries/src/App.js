import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [innerHtml, setInnerHtml] = useState(null)

  const hook = () => {
    const eventHandler = response => {
      setCountries(response.data)
      console.log(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }

  useEffect(hook, [])

  const onChange = (e) => {
    const newSearchedCountries = countries.filter(c => c.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchedCountries(newSearchedCountries)
    setInnerHtml(null)
  }

  const show = (c) => {
    return (
      <Country c = {c}/>
    )
  }

  
  var list

  if (searchedCountries.length > 10) {
    list = <p>Too many matches, specify another filter.</p>
  }
  else if (searchedCountries.length === 1) {
    list = searchedCountries.map(c =>
      show(c)
    )
  }
  else {

    const IH = (c) => {
      let tList = show(c)
      setInnerHtml(tList)
    }

    list = searchedCountries.map(c => <div key={c.population}>{c.name} <button onClick={() => IH(c)}>show</button></div>)

    if (innerHtml) { list = innerHtml }


  }

  return (
    <div>
      find countires: <input onChange={onChange} />
      {list}
    </div>
  )
}

export default App;
