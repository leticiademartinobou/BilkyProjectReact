
import { useState, useEffect } from 'react';
import UpdateUserForm from './UpdateUserForm';


export const UserProfile = ({ name, lastName, role}) =>{
  console.log("UserProfile Props", {name, lastName})

const [documents, setDocuments] = useState([])
const [error, setError] = useState(null)

useEffect(() => {

  const fetchUserProfile = async () => {
  
    const token = localStorage.getItem("token")
    console.log("Token fetched from localStorage:", token);
  
    if(!token) {
      console.log("El token no está en el localStorage")
      return setError("El token no está en el LocalStorage, haz log in otra vez")
    }
  
    console.log("este es el token que consigo en el user profile", token)

    const headers = {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }

    console.log("Estos son los headers, se están enviando:", headers);

  try{
      const fetchResponse = await fetch(`${import.meta.env.VITE_APP_URL}/user/profile`, {
      method: "GET",
      headers: headers,
      })

      console.log("response reibida", fetchResponse)
    
      if (!fetchResponse.ok) {
        const data = await fetchResponse.json();

          throw new Error(data.message || 'La respuesta del fetch no es correcta');
        }

      const data = await fetchResponse.json();
    
      if (data.success) {
        setDocuments(data.data.documents)
        console.log("documentos del usuario", data)
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
    "token" : token,
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
        {/* <div className="bg-white p-8 rounded shadow-md w-full max-w-md"> */}
          <h1 className="text-3xl md:text-5xl font-bold text-center break-words mb-4">Hola, {name} {lastName} tu rol es {role} </h1>
          <p className="mt-4 text-center text-black">Welcome, to your profile page!</p>
          <div className='mt-4'>
          <h2 className='text-2xl font-bold'>Documents</h2>
          {error && <p className='text-red-500'>{error}</p>}
          {documents.length > 0 ? (
            <ul>
              {documents.map((document) => (
                <li key={document._id}>
                  {document.name} - {document.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents available</p>
          )}


          {role === "admin" && <UpdateUserForm />

            // <div>
            //   <button onClick={handleUpdate}> Update User </button>
            //   <button onClick={handleDelete}> Delete User </button>

            // </div>
          }
          </div>
        </div>
      // </div>
    );
  };


export default UserProfile
