import { useForm } from 'react-hook-form';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTasks } from '../../context/TaskContext';

const TaskModal = ({ show, onHide, task }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: task ? task.name : '',
      description: task ? task.description : ''
    }
  });

  const { addTask, editTask } = useTasks(); 
  
  const onSubmit = (data) => {
    const json = {
      name: data.name,
      description: data.description,
      createBy: localStorage.getItem("uid").toString(),
      state: 1
    };
    if (task) {
      editTask({ ...json, idTask: task.idTask, modifyBy: localStorage.getItem("uid").toString() });
    } else {
      addTask(json);
    }
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? 'Editar Tarea' : 'Agregar tarea'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre de la tarea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre"
              {...register('name', { required: true })}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Describe tu tarea</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa una descripcion"
              {...register('description')}
            />
          </Form.Group>
         

          <Button variant="success"  type="submit" className="mt-3">
          <i className="bi bi-floppy"></i>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
