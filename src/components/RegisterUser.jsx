import { useState } from "react";
import { Link } from 'react-router-dom';
import "./styles.css";

// const { name, lastName, age, email, nif, password, role }

export const RegisterUser = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleForm(event) {
    event.preventDefault();

    let userData = {
      // se puede poner sólo el nombre porque son iguales
      name: name,
      lastName: lastName,
      age: age,
      email: email,
      nif:nif,
      password: password,
      role: role,
    };

    // poner el fetch con vble de entorno

    fetch(`${import.meta.env.VITE_APP_URL}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    console.log("botón submit", "Clicked");
  }

  return (
    <div className="h-screen min-w-180 flex items-center justify-center bg-gray-100 overflow-auto">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h1 className="mb-4 text-4xl min-w-64 font-semibold text-center">Regístrese en nuestra página</h1>

        <form action="POST">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-4">
            {/* flex y flex-wrap para crear una disposición de dos columnas en pantallas medianas y más grandes (md:w-1/2). 
            Para pantallas pequeñas, cada campo ocupa toda la anchura (w-full) */}
              <label className="block mb-2 text-xl font-medium text-gray-700">Nombre</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escriba su nombre"
                />
                {console.log("Este es el nombre de usuario", name)}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Apellido</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="text"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Escriba su apellido"
                />
                {console.log("este es el apellido del usuario", lastName)}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Edad</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="number"
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Escriba su edad"
                />
                {console.log("Esta es la edad ", age)}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Email</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Escriba su email"
                />
                {console.log("este es el email del usuario", email)}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">NIF o CIF</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="text"
                  name="nif"
                  onChange={(e) => setNif(e.target.value)}
                  placeholder="Escriba su NIF o CIF"
                />
                {console.log("Este es el nif del usuario", nif)}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-4">
              <label className="block mb-2 text-xl font-medium text-gray-700">Contraseña</label>
              <div className="flex items-center border border-blue-600 p-2 rounded">
                <input
                  className="flex-1 outline-none bg-transparent"
                  type="text"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Escriba su contraseña"
                />
                {console.log("Esta es la contraseña", password)}
              </div>
            </div>

            <div className="w-full px-4 mb-4 relative">
              <label className="block mb-2 text-xl font-medium text-gray-700">Seleccione su Rol</label>
              <select
                className="border border-blue-600 p-2 rounded w-full bg-white text-gray-400 appearance-none pr-10"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                placeholder="Seleccione su Rol"
              >
                <option value="" disabled selected hidden>
                  Seleccione su Rol
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="pointer-events-none absolute inset-y-4 right-2 flex items-center px-2 text-gray-700 h-full">
                <svg
                  className="fill-current h-6 w-6 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
              {console.log("este es el rol seleccionado", role)}
            </div>
          </div>

          <input
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            type="submit"
            onClick={handleForm}
            name="register-form"
          />
          <div className="text-black mt-4 text-center text-sm p-6">
              <p>¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 cursor-pointer">Login</Link></p>
              <br />
              <p>Más información en <Link to="/" className="text-blue-600 cursor-pointer">Home</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;