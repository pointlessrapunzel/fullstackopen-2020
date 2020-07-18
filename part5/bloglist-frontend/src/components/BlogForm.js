import React, { useState } from 'react'

const BlogForm = ({ saveBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setInput = (setter) => ({ target }) => setter(target.value)
  const submitForm = e => {
    e.preventDefault()
    saveBlog(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitForm}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={setInput(setTitle)}
          ></input>
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={setInput(setAuthor)}
          ></input>
        </div>
        <div>
          url:
          <input
            id='url'
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