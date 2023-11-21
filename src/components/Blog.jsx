import { useState } from "react"
const Blog = ({ blog, increaseLikes, removeBlogBtn, loggedUser }) => {


  const [show, setShow] = useState(false)
  // const user = await blog.user
  // try {
  //   console.log(blog.user.username, 'usernameeeeeee', blog, 'bloggggggg')
  // } catch (exception) {
  //   console.log(exception, 'error in blog.jsx', blog, 'bloggggggg')
  // }


  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid 3px',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleClick = () => setShow(!show)
  return (

    < div style={blogStyle} >
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick={handleClick}>show</button>
      </div>
      <div id="'.blog'" style={showWhenVisible} className="togglableContent">
        {blog.title} by {blog.author} <button onClick={handleClick}>hide</button>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button></p>
        <p>user: {blog.user.name}</p>
        {loggedUser
          ? (blog.user.username === loggedUser.username ? <button onClick={() => removeBlogBtn(blog)} >remove</button> : null)
          : null
        }

      </div>

    </div >
  )

}
export default Blog