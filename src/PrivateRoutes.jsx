// import { Outlet, Navigate } from "react-router-dom"
// import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom"
import { jwtDecode } from "jwt-decode"


const PrivateRoutes = () => {

  const token = localStorage.getItem("token")

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000

      // tengo que verificar antes si el token ha expirado 
      if(decodedToken.exp < currentTime) {
        console.log("token expirado, elimiando del localStorage")
        localStorage.removeItem("token")
        return <Navigate to= "/login"/>
      }

      return <Outlet />


    } catch (error) {
      console.log("token inválido", error)
      localStorage.removeItem("token")
      return <Navigate to = "/login"/>
      
    }
  }

  return <Navigate to= "/login" />

}


export default PrivateRoutes




// Outlet: Un componente de react-router-dom que representa un punto
// de inserción para los componentes secundarios. 
// Es decir, Outlet se usa para representar los componentes hijos anidados en una ruta.

