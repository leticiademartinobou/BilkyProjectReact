
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useState } from 'react';
import RecuperatePassword from "./RecuperatePassword";

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
      <div className="h-screen flex items-center justify-center bg-gray-100">
        {/* h-screen es 100vh */}
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="mb-4 text-4xl font-bold text-center">Log in</h1>
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
              Submit
            </button>

            <div className="text-black mt-4 text-center text-sm p-6">
              <p className="mb-4">¿No tienes una cuenta? <Link to="/register" className="text-blue-600 cursor-pointer">Register</Link></p>
              <p className="mb-12">¿Has olvidado tu contraseña? <Link to="/recuperate-password" className="text-blue-600 cursor-pointer">Recupera tu contraseña</Link></p>
              <p >Más información en <Link to="/" className="text-blue-600 cursor-pointer">Home</Link></p>
              {/* mb-4" a los párrafos para agregar un margen inferior de 1rem entre las líneas. 
              Esto proporciona espacio vertical entre cada párrafo. */}
            </div>
          </form>
        </div>
      </div>
    );
  };

  
  export default LoginUser;
  
  
// explicaciones

//utilizo React Hook Form en vez de useState para el formulario y las validaciones. En vez de onSubmit lo he cambiado por el método handleSubmit

// el email, valido que tenga un formato válido

// la contraseña que tenga al menos 6 caracteres