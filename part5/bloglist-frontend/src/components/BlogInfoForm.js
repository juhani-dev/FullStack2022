import PropTypes from 'prop-types'
import { useState } from 'react'
const BlogInfoForm = ({ blog,handleLike,handleRemove,user }) => {
  BlogInfoForm.propTypes = {
    blog:PropTypes.object.isRequired,
    handleLike:PropTypes.func.isRequired,
    handleRemove:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
  }
  const ButtonForm = () => {
    if(user.username === blog.user.username){
      return(
        <div> <button onClick={() => handleRemove(blog.id)}>remove</button></div>
      )
    }
    else {return(null)}
  }
  const [show,setShow] =useState(false)
  const handleClick = () => {
    setShow((isVisible) => !isVisible)
  }
  const blogData = (
    <div className='blog'>
      <li>
        {blog.likes} <button onClick={() => handleLike(blog.likes,blog.id)} >like</button>
        <br></br>
        {blog.url}
        <br></br>
        {blog.user.username}
        <br></br>
        <ButtonForm />
      </li>
    </div>)

  return(
    <div className='blogInfo'>

      {blog.title} {blog.author} <button onClick={handleClick}>toggle blog info</button>
      {show && blogData}
      <br></br>

    </div>
  )
}
export default BlogInfoForm
