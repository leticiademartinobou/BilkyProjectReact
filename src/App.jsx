import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './components/Home';
import { LoginUser } from './components/LoginUser';
import { RecuperatePassword } from "./components/RecuperatePassword";
import { RegisterUser } from './components/RegisterUser';
import { UpdateUserForm } from "./components/UpdateUserForm";
import UserProfile from './components/UserProfile';
import ResetPassword from './components/ResetPassword';
import PrivateRoutes from './PrivateRoutes';
// import  RegisterPage  from './pages/RegisterPage';
// import  LoginPage  from './pages/LoginPage';

function App() {
  const [name, setName] = useState('')
  const [lastName,setLastName] = useState('')
  const [role, setRole]  = useState('')

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000; // más explicación

        //Hay que verificar si el token ha expirado

        if( decodedToken.exp < currentTime) {
          console.log("token expirado, eliminando del localStorage")
          localStorage.removeItem("token")
        } else {
          setName(decodedToken.name)
          setLastName(decodedToken.lastName)
          setRole(decodedToken.role)
          
        }

      } catch (error) {
        console.log("Invalid token", error)
        localStorage.removeItem("token")

      }
    }
  }, []);

  const updateStatus = (token) => {
    if(token) {
      try {
        const decodedToken = jwtDecode(token)
        setName(decodedToken.name)
        setLastName(decodedToken.lastName)
        setRole(decodedToken.role)
        
        localStorage.setItem("token", token); // si todo bien, guardo el token en localStorage
        
      } catch (error) {
        console.log("failed to decode token", error)
      }

    } else {
      console.log("received undefined token")
    }
  };
  // (prev) => !prev is a function that takes the previous 
  // state value (prev) and returns the opposite value (!prev).
  // tengo un estado que coge el valor prevío y lo cambia


  return (
    
    <div >

      <BrowserRouter>    
        <Routes>
          {/* tengo qye poner un * que es donde te lleva por defecto */}
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<RegisterUser updateStatus={updateStatus} />}/>
          <Route path='/login' element={<LoginUser updateStatus={updateStatus} />}/> 

          {/* Ruta para solicitar la recuperación de la contraseña (sin token) */}
          <Route path='/recuperate-password' element={<RecuperatePassword />}/>

          {/* Ruta para cambiar la contrasña con el token */}
          <Route path='/reset-password/:token' element={<ResetPassword />}/>


          {/* Ruta para restrablecer la contraseña usando el token */}
          {/* <Route path="/resetPassword/:token" element={<RecuperatePassword />} /> */}
   
           <Route element={<PrivateRoutes/>}>
            <Route path='/profile' element={<UserProfile name={name} lastName={lastName} role={role} />} />
            <Route path='/update-user' element={<UpdateUserForm />} />
          </Route>
          <Route path='*' element={<Navigate to="/" />}/>

        </Routes>
      </ BrowserRouter>
    </div>
   
  )
}




export default App



