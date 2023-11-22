import {useSelector} from 'react-redux'
const Notification = ({msgColor}) => {

    // destructure msg value from the whole state from store
    const notifyMsg = useSelector(({msg}) => {
        console.log(msg)
        return msg
    })
    return (
        <>
        {notifyMsg && <div className={`${msgColor}`}>{notifyMsg}</div>}
        </>
        
    )
}

export default Notification