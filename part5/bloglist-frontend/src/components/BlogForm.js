import { useState } from 'react'
import '../index.css'
import Notification from'./Notification'

const BlogFormNew = ({ newBlog }) => {
  const [successMessage, setSucceessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl ]= useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleNew = async (event) => {
    event.preventDefault()
    console.log(title,author,url,newBlog)
    try {
      await newBlog ({
        title: title,
        author: author,
        url: url })

      setSucceessMessage(`new blog ${title} by ${author} created`)
      setTimeout(() => {
        setSucceessMessage(null)

      }, 3000)
      setAuthor('')
      setTitle('')
      setUrl('')

    } catch (error) {
      setErrorMessage("blog creation failed")
      setTimeout(() => {
        setErrorMessage(null)

      }, 3000)
    }

  }

  return (
    <div>
      < Notification message={successMessage} color='success'/>
      < Notification message={errorMessage} color='error'/>
      <h2>add a new blog here</h2>

      <form onSubmit={handleNew}>
        <input  value={title}   onChange={handleChangeTitle}/>
        <input  value={author} onChange={handleChangeAuthor}/>
        <input value={url} onChange={handleChangeUrl}/>
        <button type="submit">create</button>
      </form>

    </div>
  )
}
export default BlogFormNew