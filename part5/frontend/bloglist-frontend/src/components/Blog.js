import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BlogContainer = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  border: solid;
  border-width: 1px;
  margin-bottom: 5px;
`

const BlogHeader = styled.div`
  display: flex;
  justify-content: space-around;
`

const BlogTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const BlogAuthor = styled.span`
  font-size: 16px;
  font-style: italic;
`

const BlogDetails = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
`

const BlogUrl = styled.span`
  font-size: 16px;
`

const BlogLikes = styled.span`
  font-size: 16px;
`

const BlogAddedBy = styled.span`
  font-size: 16px;
`

const BlogButton = styled.button`
  font-size: 16px;
`

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogAuthor>{blog.author}</BlogAuthor>
        <BlogButton onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</BlogButton>
      </BlogHeader>
      <BlogDetails visible={visible}>
        <BlogUrl>{blog.url}</BlogUrl>
        <BlogLikes>{blog.likes} <BlogButton onClick={increaseLikes}>Like</BlogButton></BlogLikes>
        <BlogAddedBy>Added by: {user.name}</BlogAddedBy>
        {user.username === blog.user.username &&
          <BlogButton onClick={removeBlog}>Remove</BlogButton>
        }
      </BlogDetails>
    </BlogContainer>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
