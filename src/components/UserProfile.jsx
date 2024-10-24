
import { useState, useEffect } from 'react';
import UpdateUserForm from './UpdateUserForm';


export const UserProfile = ({ name, lastName, role}) =>{
 

const [documents, setDocuments] = useState([])
const [error, setError] = useState(null)

useEffect(() => {

  const fetchUserProfile = async () => {
  
    const token = localStorage.getItem("token")
  
  
    if(!token) {
      console.log("El token no está en el localStorage")
      return setError("El token no está en el LocalStorage, haz log in otra vez")
    }
  
    const headers = {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }

  try{
      const fetchResponse = await fetch(`${import.meta.env.VITE_APP_URL}/user/profile`, {
      method: "GET",
      headers: headers,
      })
    
      const data = await fetchResponse.json();
    
      if (!fetchResponse.ok) {
        const data = await fetchResponse.json();

          throw new Error(data.message || 'La respuesta del fetch no es correcta');
        }
    
      if (data.success) {
        if (Array.isArray(data.data.documents)) {
          setDocuments(data.data.documents);
          console.log("Documentos del usuario recibidos", data.data.documents);
        } else {
          console.log("Los documentos no tienen el formato esperado", data.data.documents);
          setError("Error en el formato de los documentos recibidos");
        }

      }else {
        console.log("Error consiguiendo la información del usuario", data.message)
        setError(data.message)
      }
    } catch (error) {
      console.log("Este es el error del fetch", error)
      setError(error.message)
    }
  }
    fetchUserProfile()
  }, [])

const handleUpdate = async () => {
 const token = localStorage.getItem("token")
 const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/update`, {
  method: "PUT", 
  headers: {
    "Content-Type" : "application/json", 
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({email, newEmail, password }),
 });


 const data = await response.json()

 if (data.success) {
  alert("user update successfully")
  // quiero que se actualice en mongo
 } else {
  alert(data.message || "failed to update user")
 }
}

const handleDelete = () => {
 // poner la lógica del delete
}
  
return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg bg-gray-100">
    <h1 className="text-3xl md:text-5xl font-bold text-center break-words mb-4">
      Hola, {name} {lastName} tu rol es {role}
    </h1>
    <p className="mt-4 text-center text-black">Welcome, to your profile page!</p>
    <div className='mt-4'>
      <h2 className='text-2xl font-bold'>Documents</h2>
      {error && <p className='text-red-500'>{error}</p>}
      {Array.isArray(documents) && documents.length > 0 ? (
        <ul>
          {documents.map((document) => (
            <li key={document._id}>
              {document.name ? document.name: "documento sin nombre"} - {document.description ? document.description: "documento sin ninguna description"}

            </li>
          ))}
        </ul>
      ) : (
        <p>El usuario no tiene ningún documento</p>
      )}
      {role === "admin" && <UpdateUserForm />}

      </div>
      </div>
);
};

export default UserProfile

