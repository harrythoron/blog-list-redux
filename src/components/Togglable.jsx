import { useState, forwardRef, useImperativeHandle } from "react"
const Togglable = forwardRef((props, ref) => {
    const [show, setShow] = useState(false)

    const hideWhenVisible = { display: show ? 'none' : '' }
    const showWhenVisible = { display: show ? '' : 'none' }
    const toggleVisibility = () => setShow(!show)
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} >{props.btnLabel} </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel add</button>

            </div>
        </>
    )
})

export default Togglable