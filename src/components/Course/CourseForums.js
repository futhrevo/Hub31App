import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

import isEmpty from '../../modules/isEmpty';
import { addForum } from '../../api/forums';
import { actaddForum } from '../../redux/forums/forumActions';

const CourseForums = ({ forum, course, dispatchEnableForum }) => {
  const [isLoading, setLoading] = useState(false);
  const alert = useAlert();

  const handleClick = async () => {
    try {
      setLoading(true);
      await addForum(course.id);
      dispatchEnableForum(course.id);
    } catch (e) {
      alert.error('Unable to complete');

    } finally {
      setLoading(false);
    }
  };
  if (isEmpty(forum)) {
    return (
      <Jumbotron className="text-center">
        <p>
          <Button
            disabled={isLoading}
            variant="primary"
            onClick={!isLoading ? handleClick : null}
          >
            {isLoading ? 'Loading…' : 'Click to Enable Discussion Forums'}
          </Button>
        </p>
      </Jumbotron>
    );
  }
  return <Alert variant="success">Forums enabled ✓</Alert>;
};

CourseForums.propTypes = {
  forum: PropTypes.object,
  course: PropTypes.object,
};

const mapStateToProps = (state, { course }) => ({
  forum: state?.Courses[course.id]?.Forums ?? {},
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchEnableForum: (courseId) => {
      dispatch(actaddForum(courseId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseForums);
