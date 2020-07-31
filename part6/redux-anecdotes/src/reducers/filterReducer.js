const filterReducer = (state = '', action) => {
  console.log({action})
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter.toLowerCase()
    default:
      return state
  }
}

export const setFilter = filter => ({
  type: 'SET_FILTER',
  filter
})

export default filterReducer