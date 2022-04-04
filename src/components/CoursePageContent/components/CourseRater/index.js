import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StarRatingComponent from './components/StarRatingComponent';

const CourseRater = ({ rating, onChange, id, sessId }) => {
  const handleClick = (nextVal, preVal, name) => {
    onChange(id, sessId, nextVal);
  }
  return (
    <Row className="m-5">
      <Col style={{ fontSize: 20 }} className="text-center">
        <span className="mr-3 align-top">Rate this Course</span>
        <span><StarRatingComponent name='rate1' starCount={5} value={rating} onStarClick={handleClick} /></span>
      </Col>
    </Row>
  );
}

export default CourseRater;
