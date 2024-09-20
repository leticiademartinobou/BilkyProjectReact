import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ResetPassword = () => {

    console.log("Componente ResetPassword montado");

    
    const { token } = useParams(); // leo el token de la url
    const [ newPassword, setNewPassword] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ error, setError ] = useState(null)
    const navigate = useNavigate();
    
    console.log("Token recibido:", token);

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validación de contraseña

        if(newPassword !== confirmPassword) {

            setError("las contraseñas no coinciden")
            return; 

        }

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/resetPassword/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({newPassword})
            })

            const data  = await response.json();

            if(data.success) {
                alert("Contraseña actualizada con éxito")
                navigate("/login")
            } else {
                setError(data.message)
            }


        } catch (error) {

            setError("Error al actualizar la contraseña, por favor inténtelo de nuevo")
            console.log("error al actualizar la contraseña", error)
        }

    }


    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="mb-4 text-4xl font-bold text-center"> Restablecer Contraseña</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input 
                        className="border border-blue-600 p-2 w-full rounded"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors" type="submit">
                        Restablecer Contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword