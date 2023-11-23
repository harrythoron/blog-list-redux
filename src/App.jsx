import { useState, useEffect, useRef } from 'react'
import Login from './components/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogListDisplay'
import blogService from './services/blogs'
import loginService from './services/loginService'

// import AddMsg from './components/AddMsg'
import { useDispatch, useSelector } from 'react-redux'

import { setNotify } from './reducers/notifiReducer'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUserAction } from './reducers/userReducer'




const App = () => {
  const user = useSelector(({ user }) => {
    return user
  })
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const togglableRef = useRef()


  useEffect(() => {

    dispatch(initializeBlogs())

  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUserAction(user))
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      dispatch(setUser({ username, password }))

    } catch (exception) {
      console.log('exception for login in app.jsx', exception.response.data.error)

      dispatch(setNotify({
        content: 'wrong username or password',
        time: 5000
      }))

    }
    setUsername('')
    setPassword('')

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
      // setAddMsg(`a new blog ${addedBlog.title} by ${addedBlog.author}`)
      // setTimeout(() => {
      //   setAddMsg('')
      // }, 5000);
      dispatch(setNotify({
        content: `a new blog ${addedBlog.title} by ${addedBlog.author}`,
        time: 5000
      }))
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      console.log(exception.response.data.error, 'exception for blog add in app.jsx')
    }


  }
  //increase likes button 


  //remove blog button

  return (
    <div>
      {!user
        ? <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : <div>
          <h2>blogs</h2>
          {/* {addMsg === '' ? <></> : <AddMsg msg={addMsg} />} */}
          <Notification msgColor={'add-msg'} />
          <div>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
            <Togglable btnLabel={'new blog'} ref={togglableRef}>
              <BlogForm handleForm={handleForm} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
            </Togglable>
          </div>


        </div>
      }
      <BlogList user={user} />


    </div>
  )
}

export default App