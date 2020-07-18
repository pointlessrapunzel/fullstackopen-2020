import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const testBlog = {
  title: 'Test Blog',
  author: 'Test Blog Author',
  likes: 10,
  url: '//url'
}

test('renders content', () => {
  const component = render(
    <Blog blog={testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Test Blog Test Blog Author'
  )
  expect(component.container).not.toHaveTextContent('likes 10')
  expect(component.container).not.toHaveTextContent('//url')
})