import { Alert, Container } from 'react-bootstrap';
import ErrorBoundary from './ErrorBoundary';

const NotFound = () => (
  <ErrorBoundary>
    <Container className="flex-fill m-5">
      <div className="NotFound">
        <Alert variant="danger">
          <p>
            <strong>Error [404]</strong>: {window.location.pathname} does not
          exist.
        </p>
        </Alert>
      </div>
    </Container>
  </ErrorBoundary>
);

export default NotFound;
