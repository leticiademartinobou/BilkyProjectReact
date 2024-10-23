import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"

export const RegisterUser = ( { updateStatus }) => {

  const { register, handleSubmit, watch ,formState: { errors } } = useForm(); // aquí inicializo useForm y desestructuro errores
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("") // aquí quiero manejar el mensaje de respuesta cuando me registre o no
  const navigate = useNavigate(); // hago esto para inicializar useNavigate aquí

  // hago una función para manerjar el envío del formulario

  const onSubmit = (formUserData) => {
    // console.log("Datos del formulario", formUserData)

    fetch(`${import.meta.env.VITE_APP_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formUserData),
    })
    .then((fetchResponse) => {
      if(!fetchResponse.ok) {

        // Manejo de error si la respuesta no es ok
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      return fetchResponse.json(); // parseo la response a json
    })
    .then((serverData) => {
      console.log("respuesta del servidor", serverData)
      if(serverData.token) {

        //Aquí lo que hago es que llamo a updateStatus para que guarde el token en el localStorage y actualice el estado
        updateStatus(serverData.token)
        navigate("/profile"); // si se ha hecho el register ok, ve al profile del user
        setMessage("Usuario creado correctamente")
        console.log("esta es la info del mensaje",serverData.message)
        console.log(serverData)
        
      } else if(serverData.message === "El email ya existe en la base de datos, utilice otro email o recupere su contraseña") {
        //respuesta si el usuario existe en la BBDD
        // console.log(serverData.message)

        setMessage("El email ya existe en la base de datos, utilice otro email para registrarse")
      } else {
        setMessage("Ha ocurrido un error inténtelo de nuevo")
        console.log("Error inesperado", serverData.message)

      }
    })
    .catch((error) => {
      console.log("este es el error que ha ocurrido durante el fetch", error)
      setMessage("Error del servidor, inténtelo de nuevo")
    });
  };

  //Hago un watch a la contraseña para compararla con la confirmación
  // watch es para observar campos

  const password = watch("password")


  return (
    <div className="h-screen min-w-180 flex items-center justify-center overflow-auto">
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
      <div className="bg-blue-50 p-8 rounded shadow-inner w-full max-w-4xl">
        <h1 className="mb-4 text-4xl min-w-64 font-semibold text-center ">Regístrese en nuestra página</h1>

        {/* Aqui quiero mostrar los mensajes de error o de éxito en el DOM  */}

        { message && (
          <div className={`mb-4 text-center p-3 rounded ${message.toLowerCase().includes("correctamente")? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
            {message}
          </div>
        )}

        {/* Ahora paso al handleSubmit y a la función onSubmit a form */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-4">

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Nombre</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input 
                className="flex-1 outline-none bg-transparent"
                {...register("name", {required: "El nombre es obligatorio"})} // registro del input con validación
                placeholder="Escriba su nombre"
                />
              </div>
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Apellido</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input 
                className="flex-1 outline-none bg-transparent"
                {...register("lastName", {required: "El apellido es obligatorio"})} // registro del input con validación
                placeholder="Escriba su apellido"
                />
              </div>
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          
            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Edad</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input 
                className="flex-1 outline-none bg-transparent"
                type="number"
                {...register("age", {required: "La edad es obligatoria",
                  min: {
                    value: 18, 
                    message: "Debes tener al menos 18 años para registrarte"
                  }, 
                  max: {
                    value: 99, 
                    message: "La edad máxima para registrarte son 99 años"
                  }
                })} // registro del input con validación
                placeholder="Escriba su edad"
                />
              </div>
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input 
                className="flex-1 outline-none bg-transparent"
                type="email"
                {...register("email", 
                  {required: "El email es oligatorio", 
                  pattern: { value: /^\S+@\S+$/i, message: "El email no es válido" },
                  })} 
                placeholder="Escriba su email"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">NIE o NIF</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="number" // Especifico que este campo es numérico
                  {...register("nif", {
                    required: "El NIE o NIF es obligatorio",
                    minLength: { value: 7, message: "El NIE o NIF debe tener al menos 7 caracteres" },
                    maxLength: { value: 9, message: "El NIE o NIF no puede exceder los 9 caracteres" },
                  })}
                  placeholder="Escriba su NIE o NIF"
                />
              </div>
              {errors.nif && <p className="text-red-500">{errors.nif.message}</p>}
            </div>        


            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Contraseña</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                  })}
                  placeholder="Escriba su contraseña"
                />
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Confirmar Contraseña</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Debes confirmar tu contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden", // Validación personalizada
                  })}
                  placeholder="Confirma tu contraseña"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Seleccione su Rol</label>
              <select
                className="border border-blue-600 p-2 rounded w-full bg-blue text-gray-400 appearance-none pr-10"
                {...register("role", { required: "El rol es obligatorio" })}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled hidden>
                  Seleccione su Rol
                </option>
                <option value="admin">Admin</option>
                {/* <option value="user">User</option> */} 
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>
          </div>

          <input 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            type="submit"
            value="Registrar"
          />
          <div className="text-black mt-4 text-center text-sm p-6">
            <p>¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 cursor-pointer">Login</Link></p>
            <br />
            <p>Más información en <Link to="/" className="text-blue-600 cursor-pointer">Home</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterUser;