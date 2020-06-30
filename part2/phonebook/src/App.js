import React, { useState } from 'react';

const Input = ({label, value, onChange}) => {
  return (
    <div>
      {label}
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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      <form onSubmit={handleAddPerson}>
        <Input label='name:' value={newName} onChange={handleNewNameChange} />
        <Input label='number:' value={newNumber} onChange={handleNewNumberChange} />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NumbersList persons={filteredPersons} />
    </div>
  );
}

export default App;