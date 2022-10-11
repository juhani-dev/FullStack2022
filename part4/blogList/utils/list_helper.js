const dummy = (blogs) => {
    return 1
  }

const totalLikes =(blogs) => {
    let total =blogs.map(line => line.likes ).reduce(function(sum,next){
        
        return sum+next
    },0)
    return total
}

const favoriteBlog = (blogs) => {
    const maxBlog = {
        title: "",
        author: "",
        likes: 0
    }
    
    blogs.forEach((element) => {
        
        if(element.likes > maxBlog.likes){
                maxBlog.title =element.title,
                maxBlog.author =element.author,
                maxBlog.likes =element.likes

        }
        
    })
    return maxBlog
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }