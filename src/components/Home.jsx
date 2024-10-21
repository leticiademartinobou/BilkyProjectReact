import { Link } from "react-router-dom";
import graphImage from "../images/bilkyGraph.jpg"
import usersImage from "../images/bilkyUsers.jpg"



const Home = () => {
    return (
        <div className="min h-screen flex flex-col items-center justify-center bg-white">

            {/* Aquí voy a poner la Navbar del menú de inicio*/}

            <nav className="w-full py-4 bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-3xl font-bold text-blue-600 mr-4 ml-4">Bilky</div>
                    <div className="space-x-8 text-lg font-semibold">
                        <Link to="/asesoria" className="text-gray-700 hover:text-blue-600">Soy Asesoría</Link>
                        <Link to="/empresa" className="text-gray-700 hover:text-blue-600">Soy Empresa</Link>
                        <Link to="/demo" className="text-gray-700 hover:text-blue-600">Demo</Link>
                        <Link to="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                        <Link to="/register" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Registrar</Link>
                        <Link to="/login" className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded hover:bg-blue-100">Log In</Link>
                    </div>
                </div>
            </nav>

            {/* Contenido Principal */}
            <div className="container mx-auto flex flex-col items-center mt-10 text-center max-w-7xl">
                <h1 className="text-5xl font-bold text-blue-600">
                    Un portal único 
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                Un portal que tiene todo lo que necesitan los asesores, las empresas y los empleados para gestionar de forma automática la documentación y el trabajo diario.
                </p>
                <div className="mt-6 space-x-4">
                    <Link to="/register" className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400">Registrar</Link>
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-white-700">Log In</Link>

                </div>
            </div>

            {/* Sección de gráficos */}

            <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-start items-center  ml-2">
                    <h3 className="text-xl font-semibold mb-4">Gestión trimestral</h3>
                    <img src={graphImage} alt="Gestión Trimestral" className="rounded max-w-xs w-full h-auto object-contain"/>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-start items-center mr-2">
                    <h3 className="text-xl font-semibold mb-4">Usuarios de BilKy</h3>
                    <img src={usersImage} alt="Usuarios de BilKy" className="rounded max-w-xs w-full h-auto object-contain"/>
                </div>

            </div>

            {/* Footer */}

            <footer className="w-full py-6 mt-16 bg-blue-600 text-white text-center">
                <p>© 2024 Bilky. Todos los derechos reservados.</p>

            </footer>

        </div>
    );
};

export default Home;
