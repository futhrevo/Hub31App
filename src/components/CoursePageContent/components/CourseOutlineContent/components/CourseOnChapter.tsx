import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../../../../redux/store';

import CourseOutlineChapterItem from './CourseOutlineChapterItem';

const CourseOnChapter = (props) => {
  const { chap, courseId, baseUrl } = props;
  return (
    <Row className="justify-content-md-center mb-4">
      <Col xs={12} md={8}>
        <Card bg="secondary" text="white" className="shadow">
          <Card.Header>Next</Card.Header>
          <Card.Body >
            < CourseOutlineChapterItem baseUrl={baseUrl} courseId={courseId} chap={chap} key={chap.id} card />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

CourseOnChapter.propTypes = {
  chap: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state: RootState, { course }) => {
  const { lastC } = state?.Courses[course.id]?.EnCourses ?? {};
  let chap = state?.Courses[course.id]?.Chapters[0];
  if (lastC) {
    chap = state?.Courses[course.id]?.Chapters.find(el => el.id === lastC)
  }
  return { chap, courseId: course.id };
};

export default connect(mapStateToProps, null)(CourseOnChapter);
