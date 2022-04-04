import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import { listAllCourses } from '../../api/courses';
import AppHelmet from '../../components/AppHelmet';
import CatalogCard from '../../components/Catalog/CatalogCard';
import Loading from '../../components/Loading';
import ErrorBoundary from '../ErrorBoundary';

const CatalogLibrary = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(25);
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [nextToken, setnextToken] = useState(null);

  useEffect(() => {
    async function onLoad() {
      try {
        const { data } = await listAllCourses();
        setCourses(data.listPublicCourses.courses);
        setnextToken(data.listPublicCourses.nextToken);
      } catch (error) {

      } finally {
        setFetching(false);
      }
    }
    onLoad();
  }, []);

  // const addLimit = useCallback(() => {
  //   setLimit(Math.min(count, limit + 25))
  // }, [count, limit]);

  if (fetching) {
    return <Loading />;
  }
  if (courses.length === 0) {
    return <Alert variant="warning">No Courses yet.</Alert>;
  }
  return (
    <ErrorBoundary>
      <Container className="flex-fill my-5">
        <AppHelmet title="Catalog" />
        <div>
          <Row>
            {courses.map(course => (
              <CatalogCard key={course.id} course={course} />
            ))}
          </Row>
        </div>
      </Container>
    </ErrorBoundary>
  );
}

CatalogLibrary.propTypes = {
  history: PropTypes.object,
};

export default CatalogLibrary;
