import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserContext.jsx'
import { MusicProvider } from './context/MusicContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <MusicProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </MusicProvider>
    </UserProvider>
)
