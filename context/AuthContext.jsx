import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiServices';
import LoadingSpinner from '../components/LoadingSpinner';
import { BaseUrl } from '../services/BaseUrl';
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

        console.log('Login exitoso:', uid);
        navigate('/');
      }
    } catch (error) {
      console.error('Error en login:', error);
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
        await setIsAuthenticated(true);
        await setToken(tokenString);
        await localStorage.setItem('token', tokenString);
        console.log('Registro exitoso:', response);
        console.log(tokenString);
        await navigate('/');
      }
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    console.log('Logout exitoso');
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
