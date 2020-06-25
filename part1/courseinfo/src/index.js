import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  const rows = parts.map(part => {
    return <Part key={part.exercises} part={part} />
  })
  return (
    <>
      {rows} 
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({parts}) => {
  let exercises = parts.map(part => part.exercises)
  return (
    <p>Total: {exercises.reduce((total, ex) => total + ex)}</p>
  )
}

const App = () => {
  const course =  {
    name: 'Half Stack application development',
    parts: [
      { 
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      { 
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div className="App">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);