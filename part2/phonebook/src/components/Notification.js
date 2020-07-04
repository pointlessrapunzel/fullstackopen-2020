import React from 'react'

const Notification = ({ message }) => {
  if (!message.text) return null

  const classes = `notification ${message.type}`

  return (
    <div className={classes}>
      {message.text}
    </div>
  )
}

export default Notification