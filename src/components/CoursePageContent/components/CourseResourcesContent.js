import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRscDoc } from '../../../redux/courses/docActions';

import Loading from '../../Loading';

const CourseResourcesContent = (props) => {
  const { msg, loading, doc, course, dispatchFetchDoc } = props;
  useEffect(() => {
    dispatchFetchDoc(course.id, course.resources);
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

CourseResourcesContent.propTypes = {
  doc: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  msg: PropTypes.string,
};

CourseResourcesContent.defaultProps = {
  loading: true
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchDoc: (courseId, docId) => {
      dispatch(fetchRscDoc(courseId, docId))
    },
  }
}

const mapStateToProps = (state, { course }) => ({
  loading: state?.Courses[course.id]?.resources?.loading,
  doc: state?.Courses[course.id]?.resources ?? {}
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseResourcesContent);
