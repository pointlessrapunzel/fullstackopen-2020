import React from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.attributes} />
        </div>
        <div>
          author
          <input name='author' {...author.attributes} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.attributes} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew