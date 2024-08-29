import React, { useState } from 'react';
import axios from 'axios';

export const UpdateUserForm = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/users/email/${email}`);
      console.log(response);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('User not found', error);
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
      const response = await axios.put(`/api/users/update`, {
        email,
        ...updatedData,
      });
      console.log('User updated successfully:', response.data);
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
          <h3 className="text-xl font-semibold mb-4">
            Se ha encontrado a {user.name} {user.lastName}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
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
