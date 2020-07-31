const initState = {
  message: 'yo',
  type: 'error'
}

const notificationReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return ({ 
        message: action.data.message, 
        type: action.data.type 
      })
    case 'EMPTY_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = ({ message, type }) => ({
  type: 'SET_NOTIFICATION',
  data: {
    message, type 
  } 
}) 

export default notificationReducer