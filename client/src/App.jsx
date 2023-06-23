import { useContext, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Navbar from './components/Navbar'
import View from './pages/View'
import Register from './pages/Register'
import { AuthContext } from './context/authContext'
function App() {
const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/upload" element={user?.isAdmin == true?<Upload />: <Navigate to="/login"/>} />
        <Route path='/view' element={<View/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
