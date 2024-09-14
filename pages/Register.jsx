import { apiService } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await apiService('http://localhost:4000/api/auth/new', 'POST', {
        name: data.name,
        email: data.email,
        password: data.password,
        createBy: 0,
      });
      console.log('Registro exitoso:', response);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-top align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <h2 className="text-center mb-4">Registro</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                {...register('name', { required: 'El nombre es requerido' })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                {...register('email', { required: 'El correo es requerido' })}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register('password', { required: 'La contraseña es requerida' })}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
