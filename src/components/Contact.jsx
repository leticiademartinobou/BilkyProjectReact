import { Link } from "react-router-dom"

const Contact = () => {



    return (
        <div>
            <nav className="w-full py-4 bg-white shadow-md fixed top-0 left-0"
                style= {{boxShadow: "blue-600"}}>
                <div className="container mx-auto flex justify-between items-center text-center max-w-7xl min-w-[800px]">
                    <div className="text-3xl text-blue-600 font-bold mr-4 ml-4">Bilky®</div>
                    <div className="space-x-8 text-lg font-semibold">
                        <Link to="/company" className="text-gray-700 hover:text-blue-600">Soy Asesoría</Link>
                        <Link to="/employee" className="text-gray-700 hover:text-blue-600">Soy Empresa</Link>
                        <Link to="/demo" className="text-gray-700 hover:text-blue-600">Demo</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contacto</Link>
                        <Link to="/register" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Registrar</Link>
                        <Link to="/login" className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded hover:bg-blue-100">Acceder</Link>
                    </div>
                </div>
            </nav>

            <p>Contact</p>
            <p>Contact</p>
            <p>Contact</p>
            <p>Contact</p>
     
        </div>
    );

}

export default Contact