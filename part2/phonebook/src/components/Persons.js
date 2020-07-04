import React from 'react'

const Person = ({ p, deleteHandler }) => {
  return (
    <li>
      {p.name} {p.number} 
      <button onClick={() => deleteHandler(p)}>delete</button>
    </li>
  )
}

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

export default Persons