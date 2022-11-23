
import BlogInfoForm from '../components/BlogInfoForm'
const Blog = ({ blog,handleLi,handleRe,user }) => {

  const handleLike = async (likes,id) => {
    console.log(window.localStorage.loggedUser[0])
    handleLi(likes,id)

  }
  const handleRemove = async (id) => {
    handleRe(id)

  }

  return(
    <div className='showContent'>
      <BlogInfoForm  handleLike={handleLike} handleRemove={handleRemove} blog={blog}  user={user}/>
    </div>
  )

}

export default Blog