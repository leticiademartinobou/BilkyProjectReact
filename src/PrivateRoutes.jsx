// import { Outlet, Navigate } from "react-router-dom"
// import PropTypes from 'prop-types';
import { Navigate, Route, Outlet } from "react-router-dom"

const PrivateRoutes = ({ isLoggedIn }) => {

  return isLoggedIn ? <Outlet /> : <Navigate to = "/login" />
  
};

export default PrivateRoutes

// Outlet: Un componente de react-router-dom que representa un punto
// de inserción para los componentes secundarios. 
// Es decir, Outlet se usa para representar los componentes hijos anidados en una ruta.








// const PrivateRoutes = ({ component: Component, ...rest }) => {

// const isAuthenticated = !!localStorage.getItem("token") // compuebo si existe el token

// return (
//   <Route 
//     {...rest}
//     render={(props) => 
//       isAuthenticated ? (
//         <Component {...props}/>
//       ) : (
//         <Navigate to="/login"/>
//       )
//     }
//   />
//   )
// }
// export default PrivateRoutes


// ProtectedRoute.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   // children: PropTypes.bool.isRequired,
// };
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

