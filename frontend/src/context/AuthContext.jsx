
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set the base URL for all axios requests
    const API_URL = "http://localhost:5000/api";

    // Check valid token on load
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` },
                    };
                    const { data } = await axios.get(`${API_URL}/me`, config);
                    setUser({ ...data, token });
                } catch (error) {
                    console.error("Token invalid or expired", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    // Register User
    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${API_URL}/register`, userData);
            if (data) {
                localStorage.setItem("token", data.token);
                setUser(data);
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
            return false;
        }
    };

    // Login User
    const login = async (userData) => {
        try {
            const { data } = await axios.post(`${API_URL}/login`, userData);
            if (data) {
                localStorage.setItem("token", data.token);
                setUser(data);
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return false;
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
