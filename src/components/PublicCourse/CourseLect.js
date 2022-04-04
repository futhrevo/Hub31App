import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import UserAvatar from 'react-user-avatar';

const CourseLect = ({ doc, discovering }) => {
  return (
    <div className="courseLect">
      <h4>Course Instructor</h4>
      <Row>
        <Col md={12}>
          <UserAvatar size="50" name="Lecturer" className="float-left p-3" />
          <p className="lect-desc">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages
        </p>
        </Col>
      </Row>
    </div>
  )
};

CourseLect.propTypes = {
  doc: PropTypes.object,
  discovering: PropTypes.bool,
};

CourseLect.defaultProps = {
  discovering: true,
  doc: {},
}
export default CourseLect;
// (CourseLectContainer = withTracker(() => {
//   const subscription = Meteor.subscribe('courses.viewJoined');
//   return {
//     discovering: !subscription.ready(),
//     doc: {},
//   };
// })());
