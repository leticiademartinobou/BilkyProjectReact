import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UpdateUserForm = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState("")


  const handleSearch = async () => {
    try {

        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/user/email/${email}`, {
            headers: {
            Authorization: `Bearer ${token}`      
        }
        });

        if(response && response.data && response.data.data) {

          setUser(response.data.data);
          setMessage("") // con esto quito los mensajes anteriores
        } else {
          console.log("no se ha encontrado el usuario o la response.data está vacía")
          setUser(null)
          setMessage("El usuario no existe en la base de datos")
        }

    } catch (error) {
        setUser(null) // con esto me aseguro que el "user" se reinicia si no se encuentra a ningún user
        setMessage("El usuario no existe en la base de datos")
        console.log('User not found', error);

    }
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage

        console.log("este es el email que se busca para actualizar", email)

        const response = await axios.put(`${import.meta.env.VITE_APP_URL}/user/update`, {
          email,
          ...updatedData,
        }, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
          }
        });
      
    } catch (error) {
      console.log('Error updating user', error);
      setMessage("Hubo un problema al actualizar el usuario")
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Actualizar Usuario</h2>
      
      <div className="mb-4">
        <input
          type="email"
          placeholder="Escriba el email del usuario a actualizar"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Buscar Usuario
      </button>

      {/* Quiero mostrar el mensaje de error o éxito */}

      {message && <p  className="text-red-500" >{message}</p>}

      {/* Sólo se muestra el formulario si se encuentra el usuario */}

      {user && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">

            Se ha encontrado a {user.name || "Nombre desconocido"} {user.lastName || "Apellido desconocido"}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              // value={updatedData.name || user.name} // aquí muestro el valor actualizado o el original
              placeholder={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Apellido:
            </label>
            <input
              type="text"
              name="lastName"
              // value={updatedData.lastName || user.lastName}
              placeholder={user.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rol:
            </label>
            <select
            name="role"
            onChange={handleChange}
            defaultValue={user.role}
            // placeholder={user.role}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Actualizar Usuario
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUserForm;
