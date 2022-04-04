import React from 'react';
import PropTypes from 'prop-types';
import CourseInfoContent from './CourseInfoContent';

const CourseEditor = (props) => {
  const { doc, history } = props;
  return <CourseInfoContent doc={doc} history={history} edit />;
};

CourseEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
};

export default CourseEditor;
