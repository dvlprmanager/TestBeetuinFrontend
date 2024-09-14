import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        login(data);
    };

    const handleRegister = () => {
        navigate('/auth/register');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <h2 className="text-center mb-4">Inicio de Sesión</h2>
                    <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow rounded bg-light">
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
                                {...register('password', {
                                    required: 'La contraseña es requerida',
                                    minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                                })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-2">
                            Iniciar Sesión
                        </Button>

                        <Button variant="secondary" className="w-100" onClick={handleRegister}>
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
