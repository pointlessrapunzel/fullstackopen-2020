import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const {message, type} = useSelector(state => state.notification) 
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    background: 'lightslategray',
    color: type === 'error' ? 'red' : 'green'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification