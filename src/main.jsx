import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import notifiReducer from './reducers/notifiReducer'

const store = configureStore({
    reducer: {
        msg: notifiReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <App />
    </Provider>
)