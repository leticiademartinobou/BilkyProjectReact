import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UpdateUserForm = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});


  const handleSearch = async () => {
    try {

        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        console.log("este es el email que estás intentando actualizar en react", email)

        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/user/email/${email}`, {
            headers: {
            Authorization: `Bearer ${token}`      
        }
        });

        if(response && response.data) {

          console.log("respuesta completa",response);
          console.log("esta es la data del usuario", response.data);
          setUser(response.data.data);
          // console.log("Estos son los datos de setUser", user)
        } else {
          console.log("no se ha encontrado el usuario o la response.data está vacía")
        }

    } catch (error) {

        console.log('User not found', error);
        alert("El usuario no existe en la base de datos");
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

        console.log("respuesta de la API", response)

        console.log('Usuario actualizado correctamente:', response.data);
      
    } catch (error) {
      console.error('Error updating user', error);
      alert("Se ha producido un error, no se ha podido actualizar");
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

      {user && (
        <div className="mt-6">
          {/* {console.log("datos del user", user)} */}
          <h3 className="text-xl font-semibold mb-4">
            {console.log("este es el nombre del usuario", user.name)}
            {console.log("este es el apellido del usuario", user.lastName)}
            {console.log("este es la info del usuario", user)}


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
            <input
              type="text"
              name="role"
              // value={updatedData.role || user.role}
              placeholder={user.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Actualizar Usuario
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUserForm;
