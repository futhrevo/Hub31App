import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listCourses } from '../../api/courses';
import CoursesList from '../../components/Course/CoursesList';
import ErrorBoundary from '../ErrorBoundary';
import PageHeader from '../../components/PageHeader';

const Courses = (props) => {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [lastKey, setLastKey] = useState(null);

  const fetchData = useCallback(async () => {
    if (!props.isAuthenticated) {
      return;
    }
    try {
      const res = await listCourses(lastKey);
      setDocs(docs.concat(res.items));
      setLastKey(res.lastItem);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }, [props.isAuthenticated, docs, lastKey]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <Container className="flex-fill my-5">
        <Row>
          <Col xs={12}>
            <PageHeader title="Courses">
              <Link to="/courses/new">
                <Button variant="success" className="float-right">
                  New Course
                </Button>
              </Link>
            </PageHeader>
            <CoursesList
              history={props.history}
              loading={loading}
              courses={docs}
              onAddLimit={fetchData}
            />
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

Courses.propTypes = {
  history: PropTypes.object,
};

export default Courses;
