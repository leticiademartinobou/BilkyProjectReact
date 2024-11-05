
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUserForm from './UpdateUserForm';


export const UserProfile = ({ name, lastName, role}) =>{
 

const [documents, setDocuments] = useState([])
const [documentId, setDocumentId] = useState("")
const [error, setError] = useState(null)
const [uploadFile, setUploadFile] = useState(null)
const [email, setEmail] = useState("") // este es el estado dónde quiero almacenar el email
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [formatError, setFormatError] = useState("") // quiero tener un estado para manejar formatos incorrectos
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
        if (Array.isArray(data.data.documents)) { // se puede quedar esta línea?
          setDocuments(data.data.documents ||[]); // si data.data.documents es undefined o null se utiliza un array vacío. así me aseguro que setDocuments siempre sea un array
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

  const file = e.target.files[0]
  if(file && file.type !== "application/pdf") {
    setFormatError("Sólo se pueden subir archivos en formato pdf")
    setUploadFile(null)
  } else {
    setFormatError("")
    setUploadFile(file)
  }

}

const handleUpload = async () => {

  if(!email || !uploadFile || !title) {
    setError("El email no es válido también debe seleccionar un archivo pdf y definir su título")
    return;
  } 


  const formData = new FormData();

  formData.append("file", uploadFile)
  formData.append("title", title)
  formData.append("description", description)
  formData.append("userEmail", email) // añado el email dónde quiero subir el doc en FormData. userEmail es cómo lo tengo puesto en el backend

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
    if(response.ok) {

      setDocuments([...documents, data.data]) // así añado un doc nuevo a los que ya tenga el usuarios. Añado el doc al estado de documentos
      alert("Documento añadido a la carpeta virtual del usuario seleccionado")
      console.log("documento subido con éxito", data.message)
    } else {
      alert(data.message || "error al subir el documento, compruebe el documento (tamaño, extensión) y pruebe d nuevo")
      console.log("error al subir el archivo",data.message)
    }

  } catch (error) {
    setError("error al subir el documento")
    console.log("este es el error que hay al intentar subir el documento", error)
  }

  if(role !== "admin") return null;

}

const deleteDocument = async (e) => {

  e.preventDefault(); // con esto evito que la página se cargue

  try {

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/deleteDocument`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({id: documentId }) // envío el id del doc en el body
    });

    const data = await response.json()
    if(data.success) {
      console.log(data.message)
      //actualizo el array de docs eliminando el doc con el ID proporcionado
      setDocuments((previousDocuments) => previousDocuments.filter(document => document._id !== documentId))
      alert("documento eliminado con éxito")
    } else {
      console.log(data.message)
    }
    
  } catch (error) {
    console.log("este es el error al eliminar el documento", error)
    alert(error)
  }
}
  
return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg bg-gray-100">
    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
      Hola, {name} {lastName} tu rol es {role}
    </h1>
    <p className="mt-4 text-2xl text-center text-black">Welcome, to your profile page!</p>
    <div className='mt-4'>
      <h2 className='text-2xl font-bold'>Documents</h2>
      {error && <p className='text-red-500'>{error}</p>}
      {Array.isArray(documents) && documents.length > 0 ? (
        <ul>
          {documents.map((document) => (
            <li key={document?._id}>
              {document?.title || "documento sin título"} - {document?.description || "documento sin ninguna description"}
            {/* pongo document? por si el documento no tiene los campos nombre o description que no me dé error */}
            </li>
          ))}
        </ul>
      ) : (
        <p>El usuario no tiene ningún documento</p>
      )}

      {role === "admin" && (
        <div className='mb-6'>
          <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Subir documento</h2>

            <div className='mb-4'>

            <div className='mb-4'>

              <input 
                type='text'
                placeholder='Escriba el título del documento'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
              />
            </div>

              <input 
                type='text'
                placeholder='Escriba la descripción del documento'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
              />
            </div>

            <div className='mb-4'>

              <input 
                type='email'
                placeholder='Escriba el email del usuario al que quiere subir el documento'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
              />
            </div>


            <div className='mb-4'>
              <input type='file' accept='.pdf' onChange={handleFileChange} className='w-full'/>
              {formatError && <p className='text-red-500'>{formatError}</p>}

            </div>

            <button onClick={handleUpload} className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'>
              Subir Documento (sólo PDF)
            </button>
          </div>

        </div>

      )}

      {role === "admin" && (
        <div className='mb-6'>
          <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Eliminar documento</h2>
          </div>
        </div>
      )}

      {role === "admin" && <UpdateUserForm />}

      </div>
    </div>
  );
};

export default UserProfile

