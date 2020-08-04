const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if (state && state.removalTimeoutId) {
        clearTimeout(state.removalTimeoutId)
      }

      return ({
        message: action.data.message, 
        removalTimeoutId: action.data.removalTimeoutId,
        type: action.data.type || 'default' 
      })
    case 'REMOVE_NOTIFICATION': 
      return null
    default:
      return state
  }
}

const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION'
})

export const setNotification = (message, secondsShown, type = '') => {
  return async dispatch => {
    const removalTimeoutId = setTimeout(() => dispatch(removeNotification()), secondsShown * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message, removalTimeoutId, type 
      } 
    })
  }
} 

export default notificationReducer