import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Music from './pages/Music/Music'
import About from './pages/About/About'
import BarNav from './components/BarNav/BarNav'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import PanelAdmin from './pages/PanelAdmin/PanelAdmin'
import { MusicProvider} from './context/MusicContext'


const App = () => {

  return (
    <MusicProvider>
     <main className='main-app'>
    <BarNav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/music' element={<Music/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/adminpanel' element={<PanelAdmin/>}/>
    </Routes> 
    
    </main>
   </MusicProvider>
  )
}

export default App
