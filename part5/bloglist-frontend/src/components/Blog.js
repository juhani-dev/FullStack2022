import { useState } from "react"


const Blog = ({blog}) =>{ 
  const [show,setShow] =useState(false)
  const handleClick = () => {
    setShow((isVisible) => !isVisible)
  }
  
  const blogData = (
  <div className='blog'>
    {blog.author}
    <br></br>
    {blog.likes}
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
}

export default Blog