import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const RecuperatePassword = () => {

    const { token } = useParams(); // se obtiene el token de la url
    const [email, setEmail] = useState("");
    // const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    // Función para manejar la solicitud de recuperación (sin token)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/recuperatePassword`, {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({email})
            })
            const data = await response.json()
            console.log("este es el data.success",data.success)


            if(data.success) {
                alert("se ha enviado un enlace de recuperación a tu mail")
                console.log("mensaje de recuperación enviado")

                // Guardar el token en sessionStorage
                sessionStorage.setItem("resetToken", data.token);
                console.log("Token guardado en sessionStorage:", data.token);

            } else {
                alert("error:" + data.message)
                console.log("Este es el error por el que no se envían el correo de recuperación", data.message)
            }

        } catch (error) {
            console.log("error recuperando la contraseña", error)
        }
    };

    // Función para manejar el restablecimiento de la contraseña (con token)

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        const storedToken = sessionStorage.getItem("resetToken") // así obtengo el token del SessionStorage
        console.log("token recuperado de sessionStorage", storedToken)

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/resetPassword/${token}`, {
                method:"POST", 
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({token, newPassword})
            })
            const data = await response.json()
            console.log("este es el data.success",data.success)

            if(data.success) {
                alert("Contraseña actualizada con éxito")
                sessionStorage.removeItem("resetToken") // borrar el token después de utilizarlo
                navigate("/login")
            } else {
                alert("error:" + data.message)
                console.log("este es el error", error)
            }


        } catch (error) {
            console.log("Error reseteando la contraseña:", error);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            {/* <h1 className="mb-4 text-4xl font-bold text-center">Recupera tu contraseña</h1> */}
            <h1 className="mb-4 text-4xl font-bold text-center">
            {token ? "Restablecer Contraseña" : "Recupera tu Contraseña"}
            </h1>
            
            {/* Si no hay token en la URL, mostramos el formulario para solicitar el enlace de recuperación */}
            {!token ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    className="border border-blue-600 p-2 w-full rounded"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Escriba su email"
                    required
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors" type="submit">
                  Enviar enlace de recuperación
                </button>
              </form>
                ) : (

            /* Si hay un token, mostramos el formulario para restablecer la contraseña */    
            
            <form onSubmit={handlePasswordReset}>
      
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Nueva Contraseña</label>
                <input
                  className="border border-blue-600 p-2 w-full rounded"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Introduce tu nueva contraseña"
                  required
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors" type="submit">
                Resetear Contraseña
              </button>
            </form>
            )}
          </div>
        </div>
      );
    };


export default RecuperatePassword
