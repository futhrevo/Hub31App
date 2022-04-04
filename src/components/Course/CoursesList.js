import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ListGroup, Button } from 'react-bootstrap';

import Loading from '../Loading';

function handleNav(history, id) {
  history.push(`/courses/${id}`);
}

const CoursesList = (props) => {
  const {
    courses, loading, count, limit, onAddLimit, history,
  } = props;
  if (loading && courses.length === 0) {
    return <Loading />;
  }
  if (courses.length === 0) {
    return <Alert variant="warning">No Courses yet.</Alert>;
  }
  return (
    <ListGroup className="courses-list">
      {courses.map(({ id, title }) => (
        <ListGroup.Item action key={id} onClick={() => handleNav(history, id)}>
          <div className="list-text">
            <strong>{`${title.replace(' &&& ', ' - ')}`}</strong>
          </div>
        </ListGroup.Item>
      ))}
      {limit < count ? (
        <Button size="lg" disabled={loading} onClick={() => onAddLimit()} block>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      ) : null}
    </ListGroup>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array,
  history: PropTypes.object,
  loading: PropTypes.bool,
  count: PropTypes.number,
  limit: PropTypes.number,
  onAddLimit: PropTypes.func,
};

CoursesList.defaultProps = {
  loading: true,
  courses: [],
}
export default CoursesList;

