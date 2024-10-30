
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUserForm from './UpdateUserForm';


export const UserProfile = ({ name, lastName, role}) =>{
 

const [documents, setDocuments] = useState([])
const [error, setError] = useState(null)
const [uploadFile, setUploadFile] = useState(null)
const navigate = useNavigate()

useEffect(() => {

  const fetchUserProfile = async () => {
  
    const token = localStorage.getItem("token")
  
  
    if(!token) {
      console.log("El token no está en el localStorage")
      setError("El token no está en el LocalStorage, haz log in otra vez")
      return navigate("/")
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
        // const data = await fetchResponse.json();

        //si el token está expirado o no es válido quiero que haga navigate al inicio.
        if(fetchResponse.status === 401){ // 401 es el código de error
          localStorage.removeItem("token"); // se borra el token inválido
          return navigate("/")
          }

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
  }, [navigate])

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

const handleFileChange = (e) => {
  setUploadFile(e.target.files[0])
}

const handleUpload = async () => {

  const formData = new FormData();

  formData.append("file", selectedFile)
  formData.append("userId", /* aquí hay que poner el userId del usuario al que se le asigna el documento*/)

  const token = localStorage.getItem("token")

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/upload`, {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json()
    if(data.success) {
      alert("Documento añadido a tu carpeta virtual")
      // aquí quiero que se vea el doc
    } else {
      alert(data.message || "error al subir el documento, compruebe el documento (tamaño, extensión) y pruebe d nuevo")
    }

  } catch (error) {
    setError("error al subir el documento")
    console.log("este es el error que hay al intentar subir el documento", error)
  }

  if(role !== "admin") return

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

      {role === "admin" && (
        <div className='mt-6 flex flex-col items-center gap-4'>
          <input type='file' onChange={handleFileChange}/>
          <button onClick={handleUpload} className='bg-blue-600 text-white px-4 py-2 mt-2 rounded'>
            Upload Documento
          </button>
        </div>
      )}

      {role === "admin" && <UpdateUserForm />}

      </div>
    </div>
  );
};

export default UserProfile

