import React, { useState } from 'react';

const NumbersList = ({persons}) => {
  return (
    <ul style={{'listStyle': 'none'}}>
      {persons.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleAddPerson = e => {
    e.preventDefault()
    console.log(newName)
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(
      { name: newName }
    ))
    setNewName('')
  }

  const handleNewNameChange = e => {
    setNewName(e.target.value)
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input 
            onChange={handleNewNameChange}
            value={newName}
          />
        </div>
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