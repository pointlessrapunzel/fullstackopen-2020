import React, { useState, useEffect } from 'react';

import personsService from "./services/persons";

import Input from './components/Input'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  // Notification logic

  const initialNotification = {type: null, text: null, timeoutId: null}
  const [ notification, setNotification ] = 
    useState(initialNotification)

  const resetNotification = () => {
    return setTimeout(() => {
      setNotification(initialNotification)
    }, 3000)
  }

  const makeNotification = (type, text, reset = true) => {
    if (notification.timeoutId) clearTimeout(notification.timeoutId)
    setNotification({
      type, text, 
      timeoutId: reset ? resetNotification() : null
    })
  }

  const makeErrorMessage = (text) => makeNotification('error', text)
  const makeSuccessMessage = (text) => makeNotification('success', text)
  const makePermanentErrorMessage = (text) => makeNotification('error', text, false)


  // Communication with server and event handling logic

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleAddPerson = e => {
    e.preventDefault()
    
    const newPerson = {name: newName, number: newNumber}
    const duplicate = persons.find(p => p.name === newPerson.name)

    if (duplicate) {
      updatePerson(duplicate, newPerson)
      return
    }

    personsService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        makeSuccessMessage(`Added ${response.name}`)
      })
      .catch(e => {
        console.log(e.response.data)
        makePermanentErrorMessage(e.response.data)
      })
  }

  const updatePerson = (oldPerson, newPerson) => {
    if (!window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) return

    personsService.update(oldPerson.id, newPerson)
      .then(response => {
        setPersons(
          persons.map(p => p.id === oldPerson.id ? response : p)
        )
        setNewName('')
        setNewNumber('')
      })
      .catch(e => {
        console.error(e.response.data)
        makePermanentErrorMessage(e.response.data)
      })
  }

  const handleDeletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) return
    personsService.remove(person.id)
      .then(response => {
        makeSuccessMessage(`${person.name} has been successfully deleted`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(e => {
        makeErrorMessage(`Number of ${person.name} has already been removed from server`, )
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleInput = setter => e => setter(e.target.value)

  const handleNewNameChange = handleInput(setNewName)
  const handleNewNumberChange = handleInput(setNewNumber)
  const handleFilterChange = handleInput(setFilter)

  const filteredPersons = persons.filter(p => {
    return p.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Input label='filter shown with' value={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={handleAddPerson} 
        fields={[
          {label: 'name:', value: newName, onChange: handleNewNameChange},
          {label: 'number:', value: newNumber, onChange: handleNewNumberChange},
        ]} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons} 
        deleteHandler={handleDeletePerson} 
      />
    </div>
  );
}

export default App;