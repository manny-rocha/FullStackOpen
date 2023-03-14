import React, { useState } from 'react'

const CreateBlog = props => {
  const { addBlog } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={event => addBlog(event, title, author, url)}>
        <div>Title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>Author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>URL: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit" id='create'>Create</button>
      </form>
    </div>
  )
}

export default CreateBlog