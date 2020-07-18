import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form is rendered and its event handler is called correcly', () => {
  const mockSaveBlog = jest.fn()

  const component = render(
    <BlogForm saveBlog={mockSaveBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'Test Blog' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Test Author' }
  })
  fireEvent.change(urlInput, {
    target: { value: '/test-url' }
  })

  const saveButton = component.getByText('save')
  fireEvent.click(saveButton)
  expect(mockSaveBlog.mock.calls[0][0]).toBe('Test Blog')
  expect(mockSaveBlog.mock.calls[0][1]).toBe('Test Author')
  expect(mockSaveBlog.mock.calls[0][2]).toBe('/test-url')
})