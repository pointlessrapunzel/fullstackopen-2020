import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) return null
  const { message, type } = notification
  let typeClass = `notification--${type}`

  return (
    <div className={`notification ${typeClass}`}>
      {message}
    </div>
  )
}

export default Notification