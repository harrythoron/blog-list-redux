import {createSlice} from '@reduxjs/toolkit'
import loginService from '../services/loginService'

const userSlice = createSlice({
    name: 'loggedUser',
    initialState: null,
    reducers: {
        setUserAction(state, action) {
            console.log('state',state,'action',action)
            return action.payload
        }
    }
})

export const {setUserAction} = userSlice.actions

// thunk function to set user async
export const setUser = ({username, password}) => {
    return async (dispatch, getState) => {
        const user = await loginService.login({ username, password })
        dispatch(setUserAction(user))
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        
    }
}

export default userSlice.reducer