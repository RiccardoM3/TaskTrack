import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    let navigate = useNavigate();
    return (
        <div className="text-center pt-4">
            <h4 className="mb-3">Page Not Found!</h4>
            <Button variant="success" onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
}

export default PageNotFound;
