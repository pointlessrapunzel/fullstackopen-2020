import React, { useState, useEffect } from 'react';

import personsService from "./services/persons";

import Input from './components/Input'
import PersonForm from "./components/PersonForm";

const Persons = ({persons, deleteHandler}) => {
  if (persons.length === 0) {
    return <p>Nothing found...</p>
  }
  return (
    <ul style={{'listStyle': 'none'}}>
      {persons.map(p => 
        <Person key={p.id} deleteHandler={deleteHandler} p={p} />
      )}
    </ul>
  )
}

const Person = ({ p, deleteHandler }) => {
  return (
    <li>
      {p.name} {p.number} 
      <button onClick={() => deleteHandler(p)}>delete</button>
    </li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
  }

  const handleDeletePerson = person => {
    if (!window.confirm(`Delete ${person.name}?`)) return
    personsService.remove(person.id)
      .then(response => {
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