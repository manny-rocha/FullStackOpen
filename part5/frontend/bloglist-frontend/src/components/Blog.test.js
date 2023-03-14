import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://www.testurl.com',
    likes: 0,
    id: '5f9f5c5b9c9b9c0b1c8b0b5c',
  }

  const mockUpdateBlog = jest.fn()
  const mockDeleteBlog = jest.fn()
  const mockUser = {
    name: 'Test User'
  }

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={mockUser} />)

  const element = screen.getByText('https://www.testurl.com')
  screen.debug(element)
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://www.testurl.com',
    likes: 0,
    id: '5f9f5c5b9c9b9c0b1c8b0b5c',
    user: {
      name: 'Manny Rocha'
    }
  }

  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} user={blog.user} />
  )

  const button = screen.getByText('Like')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
