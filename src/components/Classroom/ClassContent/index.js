import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { useRouteMatch } from "react-router-dom";

import ClassVideo from './components/ClassVideo';
import ClassDoc from './components/ClassDoc';
import ClassScore from './components/ClassScore';

const ClassContent = (props) => {
  let match = useRouteMatch(`/course/:courseId/class/:chapId/:matId`);
  let courseId = '';
  if (match) {
    courseId = match.params.courseId;
  }
  function renderMaterial(sessId, chapter, material) {
    if (typeof material === 'undefined') {
      return <p>Error, Please reload page</p>;
    }
    switch (material.mtype) {
      case 0:
        return <ClassScore courseId={courseId} sessId={sessId} chap={chapter} mat={material} />;
      case 1:
        return <ClassVideo courseId={courseId} sessId={sessId} chap={chapter} mat={material} />;
      case 2:
        return <ClassDoc courseId={courseId} sessId={sessId} chap={chapter} mat={material} />;
      default:
        return <p>Error, Please reload page</p>;
    }
  }

  return (
    <Col>
      {renderMaterial(props.sessId, props.chapter, props.selected)}
    </Col>
  );
}


ClassContent.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func,
};


export default ClassContent;
