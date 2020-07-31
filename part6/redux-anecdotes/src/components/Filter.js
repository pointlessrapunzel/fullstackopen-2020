import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = e => {
    dispatch(setFilter(e.target.value))
  }
  const style = { marginBottom: 10 }
  return (
    <div className='Filter' style={style}>
      filter
      <input name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter