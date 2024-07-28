import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 rounded shadow-md text-center">
                <h1 className="text-4xl font-semibold mb-8 text-gray-800">Hello and welcome to the HomePage</h1>

                <nav>
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <NavLink
                                className="text-xl font-medium transition-colors duration-300"
                                // style={({ isActive }) => ({
                                //     color: isActive ? '#01a049' : 'blue',
                                // })}
                                to="/register"
                            >
                                Regístrate
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="text-xl font-medium transition-colors duration-300"
                                // style={({ isActive }) => ({
                                //     color: isActive ? '#01a049' : 'blue',
                                // })}
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Home;
