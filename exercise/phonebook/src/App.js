import React, { useState, useEffect } from 'react'
import Filter from './Component/Filter'
import PersonForm from './Component/PersonForm'
import Persons from './Component/Persons'
import personService from './services/helper'
import Notification from './Component/Notification'
import Errors from './Component/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedPersons, setSearchedPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [keyword, setKeyword] = useState('');

  const hook = () => {
    const eventHandler = response => {
      console.log("promise fulfilled!")
      setPersons(response)
      setSearchedPersons(response)
    }
    const promise = personService.getAll()

    promise.then(eventHandler)
  }

  useEffect(hook, [])

  const inputChangeName = (e) => {
    setNewName(e.target.value)
  }

  const inputChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const inputChangeSearch = (e) => {
    setKeyword(e.target.value);
    onSearchStateChange(persons, e.target.value);
  }
  const onSearchStateChange = (persons, str) => {
    const newSearchedPersons = persons.filter(p => p.name.toLowerCase().includes(str.toLowerCase()))
    setSearchedPersons(newSearchedPersons)
  }


  const onClick = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    setNewName('')
    setNewNumber('')
    if (persons.filter(p => p.name === person.name).length) {
      if (window.confirm(`Do you want to update ${person.name}`)) {
        const newPerson = persons.filter(p => p.name === person.name)
        personService
          .update(newPerson[0].id, person)
          .then(response => {
            console.log('update', response)
            setMessage(`${response.name} has been updated`)
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
          })
        return
      }
      return
    }
    setPersons(persons.concat(person))
    onSearchStateChange(persons.concat(person), keyword);
    personService
      .create(person)
      .then(response => {
        console.log(response)
        setMessage(`${response.name} has been added.`)
        setTimeout(()=>{
          setMessage(null)
        }, 5000)

      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data)
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
      })


  }
  const removePerson = p => {
    if (window.confirm(`Do you want to delete ${p.name}`)) {
      personService
        .remove(p)
        .then(response => {
          const personsNow = persons.filter(person => person.id !== p.id)
          setPersons(personsNow)
          setMessage(`${p.name} has been deleted.`)
          setTimeout(()=>{
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `${p.name} has been already deleted from server.`
          )
          setTimeout(()=>{
            setErrorMessage(null)
          }, 5000)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Errors message = {errorMessage}/>
      <Filter inputChangeSearch={inputChangeSearch} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        inputChangeName={inputChangeName}
        inputChangeNumber={inputChangeNumber}
        onClick={onClick}
      />
      <h2>Numbers</h2>
      <Persons
        searchedPersons={searchedPersons}
        onClick={removePerson}
      />
    </div>
  )
}

export default App;
