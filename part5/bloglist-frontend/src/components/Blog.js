import { useState } from "react"
import BlogInfoForm from '../components/BlogInfoForm'
const Blog = ({ blog,handleLi,handleRe,user }) => {

  //const [likes,setLikes] =useState('')
  const [show,setShow] =useState(false)
  const handleClick = () => {
    setShow((isVisible) => !isVisible)
  }

  const handleLike = async (likes,id) => {
    console.log(window.localStorage.loggedUser[0])
    handleLi(likes,id)

  }
  const handleRemove = async (id) => {
    handleRe(id)

  }

  return(
    <div>
      <BlogInfoForm handleClick={handleClick} handleLike={handleLike} handleRemove={handleRemove} blog={blog} show={show} user={user}/>
    </div>
  )

  /*const blogData = (
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
)*/
}

export default Blog