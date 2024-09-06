import { useState } from "react";
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import RecuperatePassword from "./RecuperatePassword";
// import { MdMail } from "react-icons/md";
// import PropTypes from 'prop-types';

export const LoginUser = ( {updateStatus}) => {

    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleForm = async (event) =>{
        event.preventDefault()
        let userData = {
            email:email, 
            password:password}

    try {
      
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        const data = await response.json()
        console.log("esta es la data:",data)
        if(data.success) {
          //se actualiza el login status que le he pasado como prop
          updateStatus(data.generatedToken);
          console.log("Redirigiendo a /profile");
            //y llévame a la página
            navigate("/profile")
            console.log("llegas hasta aquí")
          } else {
            console.log("Login Failed", data.message)
          }
      
    } catch (error) {
      console.log("error loggin in:", error)
    }    
  }
  

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            {/* h-screen es 100vh */}
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="mb-4 text-4xl font-bold text-center">Log in</h1>
          <form action = "post" onSubmit={handleForm}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <FaUser className="mr-2 text-gray-400" />
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Escriba su email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <FaLock className="mr-2 text-gray-400" />
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escriba su contraseña"
                />
              </div>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              type="submit"
            >
              Submit
            </button>
            <div className="text-black mt-4 text-center text-sm p-6">
              <p className="mb-4">¿No tienes una cuenta? <Link to="/register" className="text-blue-600 cursor-pointer">Register</Link></p>
              <p className="mb-12">¿Has olvidado tu contraseña? <Link to="/" className="text-blue-600 cursor-pointer">Recupera tu contraseña</Link></p>
              <p >Más información en <Link to="/" className="text-blue-600 cursor-pointer">Home</Link></p>
              {/* mb-4" a los párrafos para agregar un margen inferior de 1rem entre las líneas. 
              Esto proporciona espacio vertical entre cada párrafo. */}
            </div>
          </form>
        </div>
      </div>
    );
  };

  // LoginUser.propTypes = {
  //   updateStatus: PropTypes.func.isRequired,
  // };
  
  export default LoginUser;
  
  
  //         <div className="">
  //             <h1>Log in</h1>
  //             <form action="POST">
  //                 <label>Email</label>
  //                 <br />
  //                 <input className="border border-blue-600" type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Escriba su email"/>
  //                 <FaUser />
  //                 {console.log("este es el email del usuario", email)}
  //                 <br />
  //                 <label>Password</label>
  //                 <br />
  //                 <input className="border border-blue-600" type="text" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Escriba su contraseña"/>
  //                 <FaLock />
  //                 <br/>
  //                 <input className="border border-blue-600" type="submit" name="login-form" onClick={handleForm}/>
  //                 <br/>
  //                 <span>¿Ya tienes una cuenta? <span>Login</span></span>
  //             </form>
  //         </div>
  //     )
  // }