import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import { updateVote } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
    const blogs = useSelector(({ blogs }) => {

        return [...blogs].sort((a, b) => a.likes > b.likes ? 0 : 1)
    })
    const dispatch = useDispatch()

    const increaseLikes = async (blog) => {
        dispatch(updateVote(blog))



    }

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
        <>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} removeBlogBtn={removeBlogBtn} loggedUser={user ? user : null} />
            )}
        </>
    )
}

export default BlogList