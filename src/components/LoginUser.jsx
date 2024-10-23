
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import RecuperatePassword from "./RecuperatePassword";
import ballonImage from "../images/globosLogin.jpg"
// import usersImage from "../images/bilkyUsers.jpg"

export const LoginUser = ( {updateStatus}) => {

    const { register, handleSubmit , formState: { errors }, setError } = useForm() // esto me sirve para inicilizar React Hook Form
    const [backendLoginError, setBackendLoginError] = useState(""); // creo el estado de errores para que se pinte el mensaje determinado

    const navigate = useNavigate();

    const handleForm = async (data) =>{

    try {
      
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // utilizo los datos del form
      })

      if (!response.ok) {
        throw new Error("Error de conexión")
      }

        const loginResponse = await response.json()
        // console.log("esta es la data:",loginResponse)

        if(!loginResponse.success) {

          // si el backend me da un error lo manejo aquí 
          if(loginResponse.message.includes("email")) {
            // si el error está relacionado con el email, lo manejo en este campo
            setError("email", { type: "manual", message: loginResponse.message })
          } else if (loginResponse.message.includes("Contraseña")) {
            setError("password", { type: "manual", message: loginResponse.message})
          } else {
            // si es otro error, vamos a este campo
            setBackendLoginError(loginResponse.message)
          }
          return;
        }

        // si el log in va bien salto aquí

        updateStatus(loginResponse.generatedToken);

        //y llévame a la página
        navigate("/profile")

      
    } catch (error) {
      setBackendLoginError("error al hacer el log in")
      console.log("error loggin in:", error)
    }    
  }
  

    return (
      <div className="min-h-screen flex">
        {/* h-screen es 100vh */}

        {/* Navbar Section del menu LogIn*/}

        <nav className="w-full py-4 bg-white shadow-md fixed top-0 left-0"
          style= {{boxShadow: "blue-600"}}>
          <div className="container mx-auto flex justify-between items-center text-center max-w-7xl min-w-[800px]">
            <div className="text-3xl text-blue-600 font-bold mr-4 ml-4">Bilky®</div>
              <div className="space-x-8 text-lg font-semibold">
                <Link to="/company" className="text-gray-700 hover:text-blue-600">Soy Asesoría</Link>
                <Link to="/employee" className="text-gray-700 hover:text-blue-600">Soy Empresa</Link>
                <Link to="/demo" className="text-gray-700 hover:text-blue-600">Demo</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                <Link to="/register" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Registrar</Link>
                <Link to="/login" className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded hover:bg-blue-100">Acceder</Link>
              </div>
            </div>
        </nav>

        {/* Contenido Principal debajo de la NavBar */}
        {/* Agrego un margen superior para dejar espacio al navBar */}

        <div className='flex mt-20'>
          {/* Columna izquierda del formulario */}
          <div className='w-1/2 flex flex-col items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-8">
              <div className='text-center'>
                <p className="text-5xl text-blue-600 font-semibold mr-4 ml-4 mb-6">Bilky®</p>
                <h1 className="mb-6 text-3xl font-bold text-center mr-4 ml-4 ">Acceder</h1>
              </div>
              <p className="mb-4 text-1xl text-center text-gray-400">Un portal único, Un único portal</p>
              <form onSubmit = {handleSubmit(handleForm)}> {/* Aquí utilizo handleSubmit de REactHook Form */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <div className="flex items-center border border-blue-600 p-2 rounded">
                    <FaUser className="mr-2 text-gray-400" />
                    <input
                      className="flex-1 outline-none bg-transparent"
                      type="email"
                      placeholder="Escriba su email"
                      {...register("email", {
                        required: "El email es obligatorio", 
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Formato de email inválido"
                        }
                      })}
                    />
                  </div>
                  {/* Aquí quiero mostrar el mensaje de error si el email no está bien o no existe en la BBDD */}
                  {errors.email && <p className='text-red-500 text-sm mt-1 min-h-[20px]'>{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                  <div className="flex items-center border border-blue-600 p-2 rounded">
                    <FaLock className="mr-2 text-gray-400" />
                    <input
                      className="flex-1 outline-none bg-transparent"
                      type="password"
                      placeholder="Escriba su contraseña"
                      {...register("password", {
                        required: "La contraseña es obligatoria", 
                        minLength: {
                          value: 6, 
                          message: "La contraseña debe tener al menos 6 caracteres"
                        }
                      })}
                    />
                  </div>
                  {/* Mostrar mensaje de error de la password */}
                  {errors.password && <p className='text-red-500 text-sm mt-1 min-h-[20px]'>{errors.password.message}</p>}
                </div>

                {/* Mensaje de error general del backend */}

                {backendLoginError && <p className='text-red-500 text-sm mt-1 min-h-[20px]'>{backendLoginError}</p>}

                <button
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  type="submit"
                >
                  Iniciar sesión
                </button>

                <div className="text-black mt-4 text-center text-sm p-6">

                  <p className='mb-4'> ¿No tienes cuenta? <Link to = "/register" className='text-blue-600 cursor-pointer'>Register</Link></p>
                  <p className='mb-12'>¿Has olvidado tu contraseña? <Link to="/recuperate-password" className='text-red-600 cursor-pointer'>Recupera tu contraseña</Link></p>
                  <p>Más información en <Link to= "/" className='text-blue-600 cursor-pointer'>Home</Link></p>

                </div>
              </form>
            </div>
          </div>

          {/* Columna derecha para la imagen de los globos */}
          <div className='w-1/2 flex items-center justify-center'>
            <img src={ballonImage} className='object-cover h-full w-full' alt="globos login"></img>
            {/* se puede poner h-full o h-95%  */}
          </div>

          </div>

        </div>


        );
      };
      
  export default LoginUser;
              
  
  
// explicaciones

//utilizo React Hook Form en vez de useState para el formulario y las validaciones. En vez de onSubmit lo he cambiado por el método handleSubmit

// el email, valido que tenga un formato válido

// la contraseña que tenga al menos 6 caracteres