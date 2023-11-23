import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotify } from './notifiReducer'




const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        increaseLike(state, action) {
            // retrieve id from 
            const id = action.payload.id

            return state.map(st => st.id !== id ? st : action.payload)
        },
        removeBlog(state, action) {
            const id = action.payload.id

            return state.filter(blog => blog.id !== id).sort((a, b) => a.likes > b.likes ? 0 : 1)
        }
    }

})

const { setBlogs, increaseLike, removeBlog } = blogSlice.actions

// thunk function to retrieve blogs from server async

export const initializeBlogs = () => {
    return async (dispatch, state) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

// thunk function to update vote in server

export const updateVote = blog => {
    console.log('blog', blog)
    return (dispatch, getState) => {
        const changedBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        blogService.update(changedBlog.id, changedBlog)
            .then(res => {
                dispatch(increaseLike(res))
                dispatch(setNotify({
                    content: `You voted '${res.title}' by ${res.author}`,
                    time: 5000
                }))
            })
            .catch(err => console.log('err in put request for likes app.jsx', err))
    }
}

// thunk functon to delete blog
export const deleteBlog = (blog, user) => {

    return async (dispatch, getState) => {

        blogService.setToken(user.token)
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog))

    }
}

export default blogSlice.reducer