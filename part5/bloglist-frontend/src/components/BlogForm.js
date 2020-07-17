import React, { useState } from 'react'

const BlogForm = ({ saveBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setInput = (setter) => ({ target }) => setter(target.value)
  const submitForm = e => {
    e.preventDefault()
    saveBlog(title, author, url)
      .then(() => {
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitForm}>
        <div>
          title:
          <input
            value={title}
            onChange={setInput(setTitle)}
          ></input>
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={setInput(setAuthor)}
          ></input>
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={setInput(setUrl)}
          ></input>
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm