import { useState, useEffect } from 'react'

import './App.css'
import './index.css'; 
import Home from './components/Home'
import { RegisterUser } from './components/RegisterUser'
import { LoginUser } from './components/LoginUser'
import UserProfile from './components/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      setIsLoggedIn(true)
    }
  }, [])

  const updateStatus = (token) => {
    setIsLoggedIn(true);
    console.log("Logged In Status:", true);
    localStorage.setItem("token", token); // Almacenar token
  };
  // (prev) => !prev is a function that takes the previous 
  // state value (prev) and returns the opposite value (!prev).
  // tengo un estado que coge el valor prevío y lo cambia


  return (
    <>
    {/* <div className="h-screen flex items-center justify-center bg-gray-100"> */}
    <div >

      <BrowserRouter>    
        <Routes>
          {/* tengo qye poner un * que es donde te lleva por defecto */}
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<RegisterUser />}/>
          <Route path='/login' element={<LoginUser/>}/> 
          <Route path='/login' element={<LoginUser updateStatus={updateStatus}/>}/>
           <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
          {/* aquí paso la prop isLoggedIn a protected route */}
            <Route path='/profile' element={<UserProfile />}/>
          </Route>
          <Route path='*' element={<Navigate to="/" />}/>

        </Routes>
      </ BrowserRouter>
    </div>
    </>
  )
}




export default App

// Si isLoggedIn es true, renderiza children, que en este caso será el componente UserProfile.

// Si isLoggedIn es false, redirige al usuario a la ruta raíz (/) utilizando Navigate.

