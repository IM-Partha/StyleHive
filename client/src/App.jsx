import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import Wishlist from './components/Wishlist'
import { SearchProvider } from './context/SearchContext'
import Cart from './components/Cart'
import Checkout from './components/Checkout'


function App() {
  

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/signup' element={<Signup/>}  />
        <Route path='/wishlist' element={<Wishlist/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/checkout' element={<Checkout/>}  />
      </Routes>
        <ToastContainer />

    </div>
  )
}

export default App
