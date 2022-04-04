import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const CourseOutline = (props) => {
  const { outline } = props;
  return (
    <ListGroup>
      {outline
        && outline.map(data => (
          <ListGroup.Item key={data.id}>{data.desc}</ListGroup.Item>
        ))}
    </ListGroup>
  );
};

CourseOutline.propTypes = {
  outline: PropTypes.array,
};

export default CourseOutline;
