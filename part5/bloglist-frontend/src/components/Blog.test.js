import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const testBlog = {
  title: 'Test Blog',
  author: 'Test Blog Author',
  likes: 10,
  url: '//url',
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}

test('Correctly renders content, title and author shown, likes and url are not', () => {
  const component = render(
    <Blog blog={testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Test Blog Test Blog Author'
  )
  expect(component.container).not.toHaveTextContent('likes 10')
  expect(component.container).not.toHaveTextContent('//url')
})

test('Likes and url are shown after the view button clicked', () => {
  const component = render(
    <Blog blog={testBlog} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  component.debug()
  expect(component.container).toHaveTextContent('likes 10')
  expect(component.container).toHaveTextContent('//url')
})
