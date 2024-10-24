import { Link } from "react-router-dom"

const EmployeeInformation = () => {

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

            <header className="w-full h-[650px] flex items-center justify-center bg-blue-900">
                <div className=" w-full min-w-full text-center">
                    <p className="text-4xl text-gray-100 md:text-5xl font-bold">Tu portal empleado para </p>
                    <p className="text-4xl text-gray-100 md:text-5xl font-bold">una gestión de <span className="text-green-200">recursos</span></p>
                    <p className="text-4xl text-gray-100 md:text-5xl font-bold"><span className="text-green-200">humanos </span>completa</p>


                </div>
            </header>

            <section className="py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-600">Principales <span className="text-blue-600">ventajas</span> del Portal Empleado</h2>
                <p className="text-gray-600 mt-4 max-w-4xl mx-auto">El portal del empleado que controla y gestiona el flujo de trabajo completo con todos tus trabajadores de forma automática y sencilla.</p>

            </section>

        </div>
    );

}

export default EmployeeInformation