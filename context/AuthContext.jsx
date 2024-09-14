import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiServices';
import LoadingSpinner from '../components/LoadingSpinner';
import { BaseUrl } from '../services/BaseUrl';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await apiService(`${BaseUrl}/auth/login`, 'POST', data);
      if (response.token) {
        setIsAuthenticated(true);
        const tokenString = String(response.token);
        const uid = String(response.uid);
        setToken(tokenString);
        localStorage.setItem('token', tokenString);
        localStorage.setItem('uid', uid);

        toast.success('Login exitoso');
        navigate('/');
      } else {
        console.log(response);
        console.log("entro ");
        toast.error('Fallo al iniciar sesión: ' + response.msg);
      }
    } catch (error) {
      toast.error('Error en login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await apiService(`${BaseUrl}/auth/new`, 'POST', data);
      if (response.token) {
        const tokenString = String(response.token);
        setIsAuthenticated(true);
        setToken(tokenString);
        localStorage.setItem('token', tokenString);

        toast.success('Registro exitoso');
        navigate('/');
      } else {
        toast.error('Fallo en el registro: ' + response.message);
      }
    } catch (error) {
      toast.error('Error en registro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('uid');

    toast.success('Logout exitoso');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
