import { useSelector } from 'react-redux'
const useReduxState = () => {
    const state = useSelector(state => {
        console.log(state)
        return state
    })
    console.log(state)


    return state
}

export default useReduxState