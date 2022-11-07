import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import createService from './services/createblog'
import Notification from './components/Notification'
//import BlogCreatedNotification from'./components/Notification'
import './index.css'
import BlogFormNew from './components/BlogForm'
import updateService from './services/updatelikes'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [usernameText, setUsernameText] = useState('')
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl ]= useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  //const [successMessage, setSucceessMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)

    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      createService.setToken(user.token)
    }
  }, [])
  const blogsToShow  = blogs.sort(function(a, b){return b.likes - a.likes})

  const HandleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setLoginVisible(false)
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
      console.log(user,"thishere")
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


  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const handleLike = async (likes,id) => {
    await updateService.update(likes,id)
    const lastdata= await blogService
      .getAll()
    setBlogs( lastdata )
  }
  const handleRemove = async (id) => {
    try {
      if (window.confirm("Do you  want to remove this blog?")) {
        await createService.remove(id)
        const lastdata= await blogService
          .getAll()
        setBlogs( lastdata ) }
    } catch (error) {
      console.log("error removal")
    }

  }
  const handleNew = async (newBlogObject) => {

    const data = await createService
      .create(newBlogObject)
    setBlogs(blogs.concat(data))

    const lastdata= await blogService
      .getAll()
    setBlogs( lastdata )
  }

  /* const Blog = ({blog}) =>{
      const [show,setShow] =useState(false)
      const handleClick = () => {
        setShow((isVisible) => !isVisible)
      }
     const handleLike = async (likes,id) => {
        await updateService.update(likes,id)
        const lastdata= await blogService
       .getAll()
        setBlogs( lastdata )
      }
      return(
        <div>
          <BlogInfoForm handleClick={handleClick} handleLike={handleLike} blog={blog} show={show} />
        </div>
      )
      const blogData = (
      <div className='blog'>
        {blog.author}
        <br></br>
        {blog.likes} <button onClick={()=>handleLike(blog.likes,blog.id)} >like</button>
        <br></br>
        {blog.user.username}

      </div>)
      return(

      <div>
        {blog.title}<button onClick={handleClick}>view blog info</button>
        {show && blogData}
        <br></br>
      </div>
    )
    }*/

  if(user === null){

    return (

      <>
        <h2> Log in</h2>

        < Notification message={errorMessage} color='error' />
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
      </>)
  }else{
    return(
      <>
        <h2>Blogs</h2>
        <div>
          {usernameText}  is logged in
          < button onClick={HandleLogOut}>logout</button>

          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>newblog</button>

          </div>
          <div style={showWhenVisible}>
            <BlogFormNew newBlog={handleNew}/>
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
          <div>
            <ul>
              {blogsToShow.map(blog =>
                <Blog key={blog.id} blog={blog} handleLi={handleLike} handleRe={handleRemove} user={user} />
              )}
            </ul>
          </div>
        </div>

      </>
    )
  }
}

export default App
