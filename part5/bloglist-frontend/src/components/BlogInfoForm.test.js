import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import BlogInfoForm from './BlogInfoForm'
import userEvent from '@testing-library/user-event'

describe('blogInfoForms', () => {

  const user =  {
    user:"namehere",
    username:"usernamehere",
    token:"tokenhere"
  }
  const blog  =
    {
      title: "titlehere",
      author: "authorhere",
      url: "urlhere",
      likes: 12,
      user: {
        name: "john",
        username: "john",
        id: "634808fd15078041ad7818bc"
      },
      id: "63481cab738d6ac9b49d3523"
    }
  let container
  const mockHandler = jest.fn()
  const mockDelete = jest.fn()
  beforeEach(() => {
    container = render(<BlogInfoForm blog={blog} user={user} handleLike={mockHandler} handleRemove={mockDelete} />).container
  })
  //const { container } = render(<BlogInfoForm blog={blog} />)

  test('shows just title and author', () => {
    const div = container.querySelector('.blogInfo')
    expect(div).toHaveTextContent(
      'titlehere'
    )
    expect(div).toHaveTextContent(
      'authorhere'
    )
  })
  test(' view button press works and shows correct info', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view blog info')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('like' && 'urlhere')

  })
  test(' view button press works if pressed twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view blog info')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)


  })
})
