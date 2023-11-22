import ErrMsg from "./ErrorMsg"
import Notification from "./Notification"
const Login = ({ handleLogin, username, setUsername, password, setPassword}) => {

    return (
        <>
            <h2>Log in to application</h2>
            <Notification msgColor={'error-msg'}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id="usernameInput" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />

                </div>
                <div>
                    password
                    <input id="passwordInput" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id="login-button" type="submit">Login</button>
            </form>
        </>
    )
}

export default Login