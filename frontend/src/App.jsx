
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext'; // Import TaskProvider
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Dashboard from './pages/Dashboard'; // Import Dashboard

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider> {/* Wrap routes with TaskProvider */}
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Header />
              <div className="container mx-auto p-4">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </div>
          </Router>
          <ToastContainer />
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
