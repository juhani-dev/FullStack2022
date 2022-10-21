import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import createService from './services/createblog'
import Notification from './components/Notification'
import BlogCreatedNotification from'./components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [usernameText, setUsernameText] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl ]= useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSucceessMessage] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const blogsToShow  = blogs.filter(line => line.user.username === usernameText)
  
  const HandleNew = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const blogToDatabase = await
    createService
    .create(newBlog)
   
  
    
    setBlogs(blogs.concat(blogToDatabase))
    setSucceessMessage(`new blog ${title} by ${author} created`)
    setTimeout(() => {
      setSucceessMessage(null)
      
    }, 3000)
    setTitle('')
      setAuthor('')
      setUrl('')
    
  }
  const HandleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.getLogin({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
        
      ) 
      
      setUser(user)
      createService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log(window.localStorage)
      setUsernameText(username)
    } catch (exception) {
      setErrorMessage("Wrong password or username")
      console.log('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        console.log('nothing')
      }, 5000)
    
    }
    console.log('logging in with', username, password)
  }
  if(user === null){
  
  return (
  
    <>
    <h2> Log in</h2>

    < Notification message={errorMessage}/>
    <div>
    <form onSubmit={handleLogin}>
    <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          
    </div>
     <div>
      password <input type="text" value={password} name="Password"
       onChange={({ target }) => setPassword(target.value)}/>
      </div> 
      <button type="submit">login</button>  
      </form>
    </div>

   
    </>
  )
}else{
  
  return(
  <>
  <h2>Blogs</h2>
  < BlogCreatedNotification message={successMessage}/>
  <div>
    {usernameText}  is logged in 
    < button onClick={HandleLogOut}>logout</button>

    <form onSubmit={HandleNew}>
    <div>
      title: <input type="text" value={title} name="title"
      onChange={({ target }) => setTitle(target.value)}/><br/>

      author: <input type="text" value={author} name="author"
      onChange={({ target }) => setAuthor(target.value)}/><br/>

      url: <input type="text" value={url} name="url"
      onChange={({ target }) => setUrl(target.value)}/><br/>
      < button type="submit">create</button>
    </div>
    </form>

     <div>
      
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
        
      </div>
  </div>
  </>
  )
}
}

export default App
