import {createSlice} from '@reduxjs/toolkit'

const initialState = '';

const notifiSlice = createSlice({
    name: 'notifi',
    initialState,
    reducers: {
        showNotify(state, action) {
            return action.payload
        },
        hideNotify(state, action) {
            return ''
        }
    }
    
})

//extract them to be used in the thunk function setNotify
const {showNotify, hideNotify} = notifiSlice.actions

export const setNotify = ({content, time}) => {
    return (dispatch, state) => {
        dispatch(showNotify(content))
        setTimeout(() => {
            dispatch(hideNotify())
        }, time);
    }
}

export default notifiSlice.reducer