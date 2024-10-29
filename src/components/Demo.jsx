import { Link } from "react-router-dom"

const Demo = () => {

    

        return (
    
            <div className="flex flex-col justify-center min-h-screen">
            {/* Barra de navegación */}
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
    

    
            <div className="py-12 pt-24 pb-12 flex flex-col items-center w-full text-center">
                <div className="container mx-auto px-4"></div>
                <h2 className="text-3xl font bold text-gray-600 mb-6 text-center">Solicita una <span  className="text-blue-600">demo gratuita</span> y sin compromiso</h2>
                <p className="text-gray-600 mt-4 mb-10 max-w-4xl mx-auto text-center">Tanto si eres Asesoría como si eres Empresa solicita una demo y nuestro equipo te enseñará todo el funcionamiento de Bilky.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Teléfono Info */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-gray-900">Llámanos</h3>
                        <p className="text-lg text-gray-700 mt-2">910 059 332</p>
                    </div>
    
                    <div>
                        <p className="text-4xl text-gray-500">|</p>
                    </div>
    
                    {/* Email Info */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-gray-900">Envía un correo</h3>
                        <p className="text-lg text-blue-600 mt-2">
                            <a href="mailto:atencionalcliente@bilky.es">atencionalcliente@bilky.es</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        );
    
    }

export default Demo