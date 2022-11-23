import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import BlogFormNew from './BlogForm'
import userEvent from '@testing-library/user-event'

test('creating a new blog form works' ,async () => {

  const createBlog = jest.fn()
  const user = userEvent.setup()
  const { container } = render(<BlogFormNew newBlog={createBlog} />)
  const inputAuthor = container.querySelector('#author')
  const inputTitle = container.querySelector(`#title`)
  const inputUrl = container.querySelector(`#url`)

  const sendButton = screen.getByText('create')

  await user.type(inputAuthor, 'testing auth')
  await user.type(inputTitle, 'testing title')
  await user.type(inputUrl, 'testing url')
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('testing auth')
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})