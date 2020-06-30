import React, { useState } from 'react';

const Input = ({label, value, onChange}) => {
  return (
    <div>
      {label}: 
      <input 
        value={value} 
        onChange={onChange} 
      />
    </div>
  )
}

const NumbersList = ({persons}) => {
  return (
    <ul style={{'listStyle': 'none'}}>
      {persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '991' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleAddPerson = e => {
    e.preventDefault()
    console.log(newName)
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

  const handleNewNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNewNumberChange = e => {
    setNewNumber(e.target.value)
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <Input label='name' value={newName} onChange={handleNewNameChange} />
        <Input label='number' value={newNumber} onChange={handleNewNumberChange} />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NumbersList persons={persons} />
    </div>
  );
}

export default App;