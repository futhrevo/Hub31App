import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../../Loading';
import { fetchAboutDoc } from '../../../redux/courses/docActions';


const CourseAboutContent = (props) => {
  const { msg, loading, doc, course, dispatchFetchDoc } = props;
  useEffect(() => {
    dispatchFetchDoc(course.id, course.about);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id]);
  if (msg) {
    return <Alert variant="info">{msg}</Alert>;
  }
  if (loading) {
    return <Loading />;
  }
  return <div dangerouslySetInnerHTML={{ __html: doc.body }} />;
};

CourseAboutContent.propTypes = {
  doc: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  msg: PropTypes.string,
};

CourseAboutContent.defaultProps = {
  loading: true
}

const mapStateToProps = (state, { course }) => ({
  loading: state?.Courses[course.id]?.about?.loading,
  doc: state?.Courses[course.id]?.about ?? {}
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchDoc: (courseId, docId) => {
      dispatch(fetchAboutDoc(courseId, docId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAboutContent);
