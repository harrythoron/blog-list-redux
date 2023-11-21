import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'

import AddMsg from './components/AddMsg'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [addMsg, setAddMsg] = useState('')
  const [addErr, setAddErr] = useState('')
  const togglableRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      //let sortBlog = blogs.sort((a, b) => a.likes > b.likes ? 0 : 1)
      // console.log(sortBlog)
      setBlogs(blogs.sort((a, b) => a.likes > b.likes ? 0 : 1))
    }

    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.response.data.error, 'exception for login in app.jsx')
      setAddErr(exception)
      setTimeout(() => {
        setAddErr('')
      }, 5000);
      setUsername('')
      setPassword('')
    }

  }
  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleForm = async (e) => {
    //for adding new blog
    e.preventDefault()
    try {
      //to hide the form after add event
      togglableRef.current.toggleVisibility()
      //after login in we set the auth token and only then can proceed to add new blog
      blogService.setToken(user.token)

      const addedBlog = await blogService.create({
        title,
        author,
        url
      })
      console.log(addedBlog, 'addedBlog from frontend')

      setBlogs(blogs.concat(addedBlog).sort((a, b) => a.likes > b.likes ? 0 : 1))
      setAddMsg(`a new blog ${addedBlog.title} by ${addedBlog.author}`)
      setTimeout(() => {
        setAddMsg('')
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      console.log(exception.response.data.error, 'exception for blog add in app.jsx')
    }


  }
  //increase likes button 
  const increaseLikes = async (param) => {

    try {
      const toBeChangedBlog = blogs.find(b => b.id === param.id)

      const newBlog = {
        ...toBeChangedBlog,
        likes: toBeChangedBlog.likes + 1


      }

      const updatedBlog = await blogService.update(param.id, newBlog)
      console.log(updatedBlog, 'updatedBlog in app.jsx')
      //return blog as it is or update it if the id matches
      setBlogs(blogs.map(b => b.id !== param.id ? b : updatedBlog).sort((a, b) => a.likes > b.likes ? 0 : 1))

    } catch (exception) {
      console.log(exception, 'err in put request for likes app.jsx')
    }
  }

  //remove blog button
  const removeBlogBtn = async (param) => {
    try {
      if (window.confirm(`Remove blog ${param.title} by ${param.author}`)) {
        //blog to be deleted
        console.log(param)
        //remove blog from frontend via filter array
        const filteredBlogs = blogs.filter(bl => bl.id !== param.id).sort((a, b) => a.likes > b.likes ? 0 : 1)
        setBlogs(filteredBlogs)
        // remove blog from server by delete request
        blogService.setToken(user.token)
        await blogService.remove(param.id)
      }


    } catch (exception) {
      console.log(exception, 'error in removeblogbutton app.jsx')
    }
  }

  return (
    <div>
      {!user
        ? <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} addErr={addErr} />
        : <div>
          <h2>blogs</h2>
          {addMsg === '' ? <></> : <AddMsg msg={addMsg} />}
          <div>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
            <Togglable btnLabel={'new blog'} ref={togglableRef}>
              <BlogForm handleForm={handleForm} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
            </Togglable>
          </div>


        </div>
      }
      {blogs.map(blog =>


        <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} removeBlogBtn={removeBlogBtn} loggedUser={user ? user : null} />



      )}

    </div>
  )
}

export default App