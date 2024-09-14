import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Task/Dashboard';
import Login from '../pages/Login'; // Asegúrate de importar tu componente de Login
import Register from '../pages/Register'; // Asegúrate de importar tu componente de Register
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../context/AuthContext';

const AppRoute = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rutas protegidas */}
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* Rutas no protegidas */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoute;
