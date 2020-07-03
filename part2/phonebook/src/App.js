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
      <button onClick={() => deleteHandler(p.id)}>delete</button>
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
        console.log(response)
        setPersons(response)
      })
  }, [])

  const handleAddPerson = e => {
    e.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number: newNumber}

    personsService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeletePerson = id => {
    personsService.remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
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