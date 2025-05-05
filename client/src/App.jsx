import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/signup' element={<Signup/>}  />
      </Routes>
        <ToastContainer />

    </div>
  )
}

export default App
