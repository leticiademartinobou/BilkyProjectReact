
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UpdateUserForm from './UpdateUserForm';


export const UserProfile = ({ name, lastName, role}) =>{
 

const [documents, setDocuments] = useState([])
const [documentId, setDocumentId] = useState("")
const [message, setMessage] = useState("")
const [error, setError] = useState(null)
const [uploadFile, setUploadFile] = useState(null)
const [searchEmail, setSearchEmail] = useState("")
const [uploadEmail, setUploadEmail] = useState("")
const [emailToDelete, setEmailToDelete] = useState("") // este es el estado dónde quiero almacenar el email
const [userFound, setUserFound] = useState(null) // estado para almacenar el email de findUser
const [showWarning, setShowWarning] = useState(false) // estado para mostrar mensaje de emergencia
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [formatError, setFormatError] = useState("") // quiero tener un estado para manejar formatos incorrectos
const navigate = useNavigate()

useEffect(() => {

  // función para obtener el perfil de usuario y sus documentos
  // verifico el token, si el token es válido  obtengo los documentos de usuario a través de un GET. 
  // error 401-> si el token expira, me redirige al inicio

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

          // si la respuesta del fetch no es correcta lanzo un error, se interrumpe el procedimiento normal y salta al catch
          // el mensaje que lanza es el el de data.message, si es undefined o null pongo el mensaje de la respuesta del fetch no es correcta

          throw new Error(data.message || 'La respuesta del fetch no es correcta');
        }
    
      if (data.success) {
          console.log("ver si document._id está disponible", data.data.documents)
          setDocuments(data.data.documents ||[]); // si data.data.documents es undefined o null se utiliza un array vacío. así me aseguro que setDocuments siempre sea un array
          setError("") // limpio errores antenriores 
        } else {
          console.log("Error consiguiendo la información del usuario", data.data.documents);
          setError(data.message || "Error consiguiendo la información del usuario");
        }

    } catch (error) {
      console.log("Este es el error del fetch", error)
      setError(error.message)
    }
  }
    fetchUserProfile()
  }, [navigate])

  // Admin puede buscar los documentos de un usuario por su email
  // Si el usuario existe actualizo el estado del UseState documents con los documentos que encuentre. Si no está el usuario me da el mensaje de error

  const handleSearch = async (e) => {

    e.preventDefault();

    setError("") // limpio los errores anteriores si los hay

    const token = localStorage.getItem('token'); 

    if(!token) {
      console.log("Tojen no encontrado")
      return
    }

    try {

      const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/email/${searchEmail}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json", 
          "Authorization": `Bearer ${token}`      
        }
      });

        const data = await response.json()

        if(response.ok) {

          setDocuments(data.data.documents || []) // aQuí pongo los docs encontrados
          setMessage("") // con esto quito los mensajes anteriores

        } else {
          console.log("usuario no encontrado o sin documentos")
          setDocuments([]) // reset de docs si no encuentra el usuario
          setMessage("El usuario no existe en la base de datos")
        }

    } catch (error) {
        setDocumentId([]) // reseteo los docs si no encuentro el usuario
        setMessage("El usuario no existe en la base de datos")
        console.log('Este es el error que obtengo', error);

    }
  };

const handleUpdate = async () => {
 const token = localStorage.getItem("token")
 const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/update`, {
  method: "PUT", 
  headers: {
    "Content-Type" : "application/json", 
    "Authorization": `Bearer ${token}`,
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

// lógica para borrar un usuario 

// Busco el usuario

const findUser = async () => {

  const emailToFind = searchEmail || emailToDelete

  if(!emailToFind) {
    console.log("No hay email que buscar")
    return;
  }
  
  console.log("Email que vas a buscar para eliminar", emailToFind)

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/findUserByEmail`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify( {email: emailToFind} )
    });


    const data = await response.json();
    console.log("respuesta del backend en findUser fc", data)

    if(data.success) {
      setUserFound(data.user)
      setMessage("") // limpio los mensajes si va todo bien
    } else {
      setUserFound(null)
      setMessage("Usuario no encontrado")
    }

  } catch (error) {
    console.log("Error al buscar al usuario", error)
    setMessage("Ha habido un error en la búsqueda del usuario")
  }
}

// Con esta función eliminamos y enviamos el mensaje de confirmación

const deleteUser = async () => {

  try {

    const response = await fetch(`${import.meta.env.VITE_APP_URL}/user/delete`, {
      method: "DELETE", 
      headers: { "Content-Type": "application/json"}, 
      body: JSON.stringify({email: userFound.email}) // envío el email del usuario encontrado
    })

    const data = await response.json()
    console.log("respuesta del backend: ", data)
    console.log("email para eliminar", userFound.email)

    if(data.success) {
      setMessage("Usuario eliminado")
      setUserFound(null) // con esto elimino el estaddo donde está el usuario encontrado 
      setShowWarning(false) // No pongo ningún mensaje de aviso
      setEmailToDelete("") // borro lo que tenga en el campo email
    } else {
      setMessage("Error al eliminar el usuario")
    }
    
  } catch (error) {
    console.log("este es el error que ha pasado al intentar eliminar el usuario", error)
    setMessage("Hubo un error al intentar eliminar el usuario")
  }
}




// utilizo está función para verificar que es un PDF y que sólo se suban PDF  

const handleFileChange = (e) => {

  // e.target -> evento que es que el usuario selecciona un archivo
  // e.target.files -> array de archivos seleccionados por el usuario
  // e.target.files[0] -> sólo necesito el primer archivo porque sólo subo los docs de uno en uno

  const file = e.target.files[0];

  if (file && file.type !== "application/pdf") {

    setFormatError("Sólo se pueden subir archivos en formato pdf")
    setUploadFile(null);
  } else {

    setFormatError("")
    setUploadFile(file)

  }

}

// si el usuario es admin, se puede subir un documento a un usuario específico. Los datos del archivo y el title se envían en FormData

const handleUpload = async () => {
  

  if(role !== "admin") return null;

  if(!uploadEmail || !uploadFile || !title) {
    setError("El email no es válido también debe seleccionar un archivo pdf y definir su título")
    return;
  } 


  const formData = new FormData();
  // creo una instancia de FormData. Este es un objeto con un formato que se puede enviar a través de una solicitud POST de tipo multipart/form-data
  // con formData creo un objeto vacío de FormData

  //Aquí voy agregando datos a formData con el método append
  // file, añado el archivo title, el title al documento description, añado la descrip. userEmail, añado el email asociado al doc.

  formData.append("file", uploadFile)
  formData.append("title", title)
  formData.append("description", description)
  formData.append("userEmail", uploadEmail) // añado el email dónde quiero subir el doc en FormData. userEmail es cómo lo tengo puesto en el backend

  const token = localStorage.getItem("token")

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/upload`, {
      method: "POST", 
      headers: {
        "Authorization": `Bearer ${token}` // agrego el token para autentificar. No necesito añadir el Content-Type: multipart/form-data ya que fetch lo maneja automáticamente
      },
      body: formData // aquí incluyo el formData con el archivo y los datos.
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

}

// función para eliminar un documento

const handleDelete = async (documentId) => {
  console.log("Vas a borrar el documentId =>", documentId)
  const token = localStorage.getItem("token")

  if(!token) {
    setError("El token no se ha encontrado, por favor haga log in de nuevo")
    return 
  }
  
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/delete`, {
      method:"DELETE", 
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify( {documentId: documentId })
    })

    const data = await response.json()

    if(response.ok) {
      console.log("Se ha eliminado el siguiente documento", documentId)
      setDocuments((previousDocuments) => previousDocuments.filter((document)=> document._id !== documentId))
      setMessage("documento eliminado correctamente")

    } else {
      setError(data.message || "Error al eliminar el documento")
    }
  } catch (error) {
    setError("error al eliminar el documento")
    console.log("error al eliminar el documento", error)
  }
 }

 // llamada a la API para eliminar el documento

// const deleteDocument = async (documentId) => {

//   const token = localStorage.getItem("token")

//   if(!token) {
//     console.log("Token no encontrado")

//     throw new Error("Token no encontrado, haga el log in de nuevo")
  
//   }

//   const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/delete`, {
//     method: "DELETE", 
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify({ id: documentId })
//   })
  
//   const data = await response.json()

//   if(!response.ok) throw new Error(data.message || "Error al eliminar el documento")
  
//     return data;

// }
//   try {

//     const response = await fetch(`${import.meta.env.VITE_APP_URL}/document/delete`, {
//       method: "DELETE", 
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({id: documentId }) // envío el id del doc en el body
//     });

//     const data = await response.json()
    
//     if(data.success) {
//       console.log(data.message)
//       //actualizo el array de docs eliminando el doc con el ID proporcionado
//       setDocuments((previousDocuments) => previousDocuments.filter(document => document._id !== documentId))
//       alert("documento eliminado con éxito")
//     } else {
//       console.log(data.message)
//       alert("No se ha podido eliminar el documento")
//     }
    
//   } catch (error) {
//     console.log("este es el error al eliminar el documento", error)
//     alert(error)
//   }
//   return response.data
// } 


// función para cerrar sesión 

const logOff = () => {
  localStorage.removeItem("token")
  return navigate("/")
}

return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg bg-gray-100">
    {/* Link de Home */}
    <div className='mb-4 flex items-center justify-end px-4 space-x-4'>
      <Link to = "/" className='text-blue-500 hover:underline text-lg'>
         Home
      </Link>
      <button onClick={logOff} className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'>Log Off</button>
    </div>
    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
      Hola, {name} {lastName} tu rol es {role}
    </h1>
    {/* Mostras documentos encontrados */}

    <p className="mt-4 text-2xl text-center text-black">Welcome, to your profile page!</p>
    <div className='mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Documentos de {searchEmail}</h2>
      {message && <p className='text-red-500'>{message}</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {Array.isArray(documents) && documents.length > 0 ? (
        <ul>
          {documents.map((document) => (
            <li key={document?._id}>
              <strong>Document ID:</strong> {document?._id || "ID no disponible"} - <strong>Título: </strong>{document?.title || "documento sin título"} - <strong>Descripción: </strong>{document?.description || "documento sin ninguna description"}
            {/* pongo document? por si el documento no tiene los campos nombre o description que no me dé error */}
            </li>
          ))}
        </ul>
      ) : (
        <p>El usuario no tiene ningún documento</p>
      )}

      {/* Formulario para buscar documentos */}

      {role === "admin" && (
        <div className='mb-6'>
          <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Encontrar documentos usuario</h2>
            <div className='mb-4'>
              <form onSubmit={handleSearch}>
                <div className='mb-4'>

                  <input 
                  type='email'
                  placeholder='Escribe el email del usuario para ver sus documentos'
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
                  required

                  />
                </div>

              <button type="submit"  className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'>
                Buscar usuario
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para subir documentos */}


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
                value={uploadEmail}
                onChange={(e) => setUploadEmail(e.target.value)}
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

      {/* Formulario para eliminar documentos */}

      {role === "admin" && (
        <div className='mb-6'>
          <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Eliminar documento</h2>
            <div className='mb-4'>
              <form onSubmit= {(e)=>{e.preventDefault(); handleDelete(documentId)}}>
                <div className='mb-4'>

                  <input 
                  type='text'
                  placeholder='Escribe el ID del documento a eliminar'
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)  }
                  className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
                  required

                  />
                </div>
                  <button 
                    type='submit'
                    className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200' 
                  >
                    Eliminar documento
                    </button>
              </form>
            </div>
          </div>
        </div>
      )}

      

      {role === "admin" && <UpdateUserForm />}

      {/* Aquí busco el usuario por su email */}

      {role === "admin" && (
        <div className='mb-6'>
          <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Encontrar usuario a eliminar</h2>
            <div className='mb-4'>
                <div className='mb-4'>

                  <input 
                  type='email'
                  placeholder='Escribe el email del usuario a eliminar'
                  value={emailToDelete}
                  onChange={(e) => setEmailToDelete(e.target.value)}
                  className='w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black'
                  required

                  />
                </div>

              <button onClick={findUser}  className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'>
                Buscar usuario
                </button>
            </div>

            {/* Mostrar usuario encontrado */}

            {userFound && (
              <div className='mb-4'>
                <p className='text-gray-700'>Usuario encontrado: <strong>{userFound.name}</strong></p>
                <button
                  onClick={()=> setShowWarning(true)}
                  className='bg-red-500 text-white py-2 px-4 mt-2 rounded hover:bg-red-600 transition'
                >
                  Eliminar usuario
                </button>
              </div>
            )}

           {/* Mensaje de warning     */}

           {showWarning && (
              <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4'>
                <p>¿Está seguro de borrar al usuario <strong>{userFound.name}</strong></p>
                <div className='mt-2 flex justify-end'>
                  <button
                    onClick={deleteUser}
                    className='bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition mr-2'
                  >
                    Confirmar
                  </button>

                  <button onClick={()=> setShowWarning(false)}
                    className='bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition'>
                      Cancelar
                  </button>
                </div>
              </div>
           )}

           {/* Mensajer de éxito o error al eliminar un usuario */}
           {message && <p className='mt-4 text-center text-gray-600'>{message}</p>}
           {error && <p className='text-red-500'>{error}</p>}

          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default UserProfile

