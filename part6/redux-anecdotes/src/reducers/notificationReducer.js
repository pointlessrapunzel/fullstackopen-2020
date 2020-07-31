const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if (state && state.timeout) {
        clearTimeout(state.timeout)
      }

      return ({
        message: action.data.message, 
        timeout: action.data.timeout,
        type: action.data.type || 'default' 
      })
    case 'REMOVE_NOTIFICATION': 
      return null
    default:
      return state
  }
}

export const setNotification = (message, timeout, type = '') => ({
  type: 'SET_NOTIFICATION',
  data: {
    message, timeout, type 
  } 
}) 

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION'
})

export default notificationReducer