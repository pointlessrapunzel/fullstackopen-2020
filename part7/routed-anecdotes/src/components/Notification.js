import React from 'react'

const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    background: '#a5a',
    padding: 8,
    border: '2px solid black',
    borderRadius: 10
  }

  return (
    <div style={style}>{message}</div>
  )
}

export default Notification