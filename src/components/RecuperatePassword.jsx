import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RecuperatePassword = () => {

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

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
            } else {
                alert("error:" + data.message)
                console.log("Este es el error por el que no se envían el correo de recuperación", data.message)
            }

        } catch (error) {
            console.log("error recuperando la contraseña", error)
        }
    };

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/resetPassword`, {
                method:POST, 
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({token, newPassword})
            })
            const data = await response.json()
            console.log("este es el data.success",data.success)

            if(data.success) {
                alert("Contraseña actualizada con éxito")
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
            <h1 className="mb-4 text-4xl font-bold text-center">Recupera tu contraseña</h1>
            
            {/* Solicitar el email para enviar el enlace de recuperación */}
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
    
            {/* Formulario para resetear la contraseña */}
            <form onSubmit={handlePasswordReset} className="mt-8">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Token</label>
                <input
                  className="border border-blue-600 p-2 w-full rounded"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Introduce tu token"
                  required
                />
              </div>
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
          </div>
        </div>
      );
    };


export default RecuperatePassword
