import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import { updateVote, deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
    const blogs = useSelector(({ blogs }) => {

        return [...blogs].sort((a, b) => a.likes > b.likes ? 0 : 1)
    })
    // const user = useSelector(({ user }) => {
    //     console.log('userrrrr', user)
    //     return user
    // })
    const state = useSelector(state => state)
    // console.log(state.user)
    const dispatch = useDispatch()

    const increaseLikes = (blog) => {
        dispatch(updateVote(blog))



    }

    const removeBlogBtn = (blog) => {
        try {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                dispatch(deleteBlog(blog, state.user))
            }
        } catch (exception) {
            console.log('error in removeblogbutton app.jsx', exception)
        }
    }
    return (
        <>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} removeBlogBtn={removeBlogBtn} loggedUser={user ? user : null} />
            )}
        </>
    )
}

export default BlogList