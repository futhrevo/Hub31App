import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import CourseEditor from '../../components/Course/CourseEditor';
import ErrorBoundary from '../ErrorBoundary';
import PageHeader from '../../components/PageHeader';

const handleBack = (history) => {
  history.push('/courses');
};

const NewCourse = ({ history }) => (
  <ErrorBoundary>
    <Container className="flex-fill my-5">
      <PageHeader title="New Course">
        <ButtonToolbar className="float-right">
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => handleBack(history)}>
              Cancel
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </PageHeader>
      <CourseEditor history={history} />
    </Container>
  </ErrorBoundary>
);

NewCourse.propTypes = {
  history: PropTypes.object,
};

export default NewCourse;
