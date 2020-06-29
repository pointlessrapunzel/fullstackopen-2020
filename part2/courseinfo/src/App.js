import React from 'react'
import Course from "./components/Course";

const App = ({ courses }) => {
  return (
    <div className="App">
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

export default App