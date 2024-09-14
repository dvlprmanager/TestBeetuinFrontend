import { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/apiServices';
import { BaseUrl } from '../services/BaseUrl';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const uid = localStorage.getItem("uid").toString();
      const result = await apiService(`${BaseUrl}/task/getTask/${uid}`, 'GET', null, token);
      setTasks(result.Tareas);
      console.log(result);
    } catch (error) {
      toast.error('Error Al obtener datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await apiService(`${BaseUrl}/task/newTask`, 'POST', taskData, token);
      if (response.Creado) {
        toast.success('Tarea agregada exitosamente!');
      } else {
        toast.error('Fallo al agregar tarea: ' + response);
      }
      fetchTasks();
    } catch (error) {
      toast.error('Error adding task: ' + error.message);
    }
  };

  const editTask = async (updatedData) => {
    try {
      const response = await apiService(`${BaseUrl}/task/updateTask`, 'PUT', updatedData, token);
      if (response.Actualizado) {
        toast.success('Tarea actualizada con exito!');
      } else {
        toast.error('Fallo al actualizar: ' + response.message);
      }
      fetchTasks();
    } catch (error) {
      toast.error('error durante la actualizacion : ' + error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await apiService(`${BaseUrl}/task/update`, 'PUT', { idTask: taskId, state: 0, modifyBy: localStorage.getItem("uid").toString() }, token);
      if (response.Desactivado) {
        toast.success('Tarea eliminada con exito!');
      } else {
        toast.error('fallo al eliminar tarea: ' + response.message);
      }
      fetchTasks();
    } catch (error) {
      toast.error('error durante la actualizacion: ' + error.message);
    }
  };

  const finishTask = async (taskId) => {
    try {
      const response = await apiService(`${BaseUrl}/task/update`, 'PUT', { idTask: taskId, state: 2, modifyBy: localStorage.getItem("uid").toString() }, token);
      if (response.Desactivado) {
        toast.success('Tarea finalizada con exito !');
      } else {
        toast.error('Fallo al finalizar la tarea: ' + response.message);
      }
      fetchTasks();
    } catch (error) {
      toast.error('Error al finalizar la tarea: ' + error.message); // Muestra error en toast
    }
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalShow(false);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        editTask,
        deleteTask,
        finishTask,
        handleShowModal,
        handleCloseModal,
        selectedTask,
        modalShow
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
