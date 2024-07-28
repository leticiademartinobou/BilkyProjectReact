// import { Outlet, Navigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
// import PropTypes from 'prop-types';


const ProtectedRoute = ({ isLoggedIn, children }) => {
// const ProtectedRoute = ({ isLoggedIn }) => {

  console.log("esta es la ProtectedRoute isLoggedIn",isLoggedIn)
  
  return isLoggedIn ? children : <Navigate to="/" />
  // return isLoggedIn ? <Outlet /> : <Navigate to="/" />

}

// ProtectedRoute.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   // children: PropTypes.bool.isRequired,
// };
export default ProtectedRoute

  //(
    // <div>
    //     {isLoggedIn ? children : <Navigate to="/" />}

    //     {/* {isLoggedIn ? <Outlet /> : <Navigate to="/" />} */}
    // </div>
  // )

// ¿Qué Hace ProtectedRoute?
// Recibe isLoggedIn y children como Props:

// isLoggedIn: indica si el usuario está logueado o no.
// children: Los componentes hijos que deben renderizarse si el usuario está autenticado.

// Lógica de Renderizado:

// Si isLoggedIn es true, ProtectedRoute renderiza children (los componentes hijos).
// Si isLoggedIn es false, ProtectedRoute redirige al usuario a la página principal (/) usando Navigate.

// Outlet: Un componente de react-router-dom que representa un punto
// de inserción para los componentes secundarios. 
// Es decir, Outlet se usa para representar los componentes hijos anidados en una ruta.
