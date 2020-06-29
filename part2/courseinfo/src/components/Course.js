import React from 'react'


const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Content = ({ parts }) => {
  const rows = parts.map(part => {
    return <Part key={part.exercises} part={part} />
  })
  return (
    <div>
      {rows} 
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({parts}) => {
  let exercises = parts.reduce((total, p) => total + p.exercises, 0)
  return (
    <p style={{'fontWeight': 'bold'}}>
      total of {exercises} exercises
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course