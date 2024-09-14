import { Button, FormControl, InputGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import TaskModal from './TaskModal';
import { useTasks } from '../../context/TaskContext';
import TaskStatus from '../../components/TaskStatus';
import { useState } from 'react';

const TaskList = () => {
  const { tasks, loading, addTask, editTask, deleteTask, finishTask, handleShowModal, handleCloseModal, selectedTask, modalShow } = useTasks();

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = () => {
    handleShowModal(null);
  };

  const handleEditTask = (task) => {
    handleShowModal(task);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const handleFinishTask = async (id) => {
    await finishTask(id);
  };

  // Filtrar las tareas por el término de búsqueda
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: 'ID', selector: row => row.idTask, sortable: true },
    { name: 'Nombre', selector: row => row.name, sortable: true },
    { name: 'Descripcion', selector: row => row.description },
    { name: 'Creado', selector: row => new Date(row.createDate).toLocaleString() },
    { name: 'Estado', selector: row => <TaskStatus state={row.state} /> },
    {
      name: 'Actions',
      cell: row => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="link" onClick={() => handleEditTask(row)} style={{ padding: 0 }}>
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="link" onClick={() => handleFinishTask(row.idTask)} style={{ padding: 0 }}>
            <i className="bi bi-check-circle"></i>
          </Button>
          <Button variant="link" onClick={() => handleDeleteTask(row.idTask)} style={{ padding: 0 }}>
            <i className="bi bi-trash"></i>
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>

        <Button onClick={handleAddTask}>
          <i className="bi bi-plus-lg"></i>
        </Button>


        <InputGroup style={{ maxWidth: '300px' }}>
          <FormControl
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>


      <DataTable
        title="Lista de Tareas"
        columns={columns}
        data={filteredTasks}
        progressPending={loading}
        pagination
      />


      <TaskModal
        show={modalShow}
        onHide={handleCloseModal}
        task={selectedTask}
        onSave={selectedTask ? editTask : addTask}
      />
    </>
  );
};

export default TaskList;
