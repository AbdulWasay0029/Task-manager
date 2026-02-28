
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="logo">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        TaskFlow
                    </Link>
                </div>
                <nav>
                    <ul className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <li className="flex items-center text-gray-700">
                                    <FaUser className="mr-2" />
                                    <span className="font-medium">{user.name}</span>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        onClick={onLogout}
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        <FaUser className="mr-2" /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
