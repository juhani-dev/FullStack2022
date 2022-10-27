import PropTypes from 'prop-types'
const BlogInfoForm = ({ blog,handleClick,handleLike,handleRemove,show,user }) => {
  BlogInfoForm.propTypes = {
    blog:PropTypes.object.isRequired,
    handleClick:PropTypes.func.isRequired,
    handleLike:PropTypes.func.isRequired,
    handleRemove:PropTypes.func.isRequired,
    show:PropTypes.bool.isRequired,
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
  const blogData = (
    <div className='blog'>
      {blog.author}
      <br></br>
      {blog.likes} <button onClick={() => handleLike(blog.likes,blog.id)} >like</button>
      <br></br>
      {blog.user.username}
      <br></br>
      <ButtonForm />
    </div>)

  return(
    <div>
      {blog.title}  <button onClick={handleClick}>view blog info</button>
      {show && blogData}
      <br></br>
    </div>
  )
}
export default BlogInfoForm
