import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    return (
        <div className="text-center pt-4">
            <h4 className="mb-3">Login coming soon!</h4>
            <Button variant="success" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
}

export default Login;
