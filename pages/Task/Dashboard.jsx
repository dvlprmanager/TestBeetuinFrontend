// pages/Dashboard.jsx
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import TaskModal from './TaskModal'; // Importa TaskModal
import TaskList from './TaskList';
import { TaskProvider } from '../../context/TaskContext';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <TaskProvider>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Tareas</h2>
          <Button variant="danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i>
          </Button>
        </div>
        <TaskList /> 
      </div>
    </TaskProvider>
  );
};

export default Dashboard;
