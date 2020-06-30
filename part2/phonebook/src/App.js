import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Input from './components/Input'
import PersonForm from "./components/PersonForm";

const Persons = ({persons}) => {
  if (persons.length === 0) {
    return <p>Nothing found...</p>
  }
  return (
    <ul style={{'listStyle': 'none'}}>
      {persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleAddPerson = e => {
    e.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(
      { name: newName, number: newNumber }
    ))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;