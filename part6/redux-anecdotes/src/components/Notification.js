import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const {message, type} = props.notification || '' 
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    color: type === 'error' ? 'red' : 'black'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)