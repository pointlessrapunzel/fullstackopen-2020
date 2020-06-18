import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts, exercises }) => {
  let rows = []
  for (let i = 0; i < parts.length; i++) {
    rows.push(<Part key={i} title={parts[i]} exercises={exercises[i]} />)
  } 
  return (
    <>
      {rows}
    </>
  )
}

const Part = ({ title, exercises }) => {
  return (
    <p>{title} {exercises}</p>
  )
}

const Total = ({exercises}) => {
  return (
    <p>Total: {exercises.reduce((total, ex) => total + ex)}</p>
  )
}

const App = () => {
  const course = 'Half Stack app'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div className="App">
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);