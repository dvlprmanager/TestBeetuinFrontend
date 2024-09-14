import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default LoadingSpinner;
