import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Tab, Nav,
} from 'react-bootstrap';

import CompletedCoursesContainer from './components/CompletedCourses';
import JoinedCoursesContainer from './components/JoinedCourses';
import InProgressContainer from './components/InProgress';
// import ExamJoiner from './components/ExamJoiner';

const MyCourses = ({ docs, discovering, history }) => (
  <Tab.Container id="left-tabs" defaultActiveKey="first">
    <Row className="clearfix" id="left-tabs">
      <Col sm={4} md={3}>
        <Nav variant="pills" className="flex-column fill-dark-acc col-card">
          <Nav.Item>
            <Nav.Link eventKey="zero" disabled>MY COURSES</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="first">In Progress</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">All Joined</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Completed</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="fifth" disabled><hr /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Group Exam</Nav.Link>
          </Nav.Item> */}
        </Nav>
      </Col>
      <Col sm={8} md={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <InProgressContainer />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <JoinedCoursesContainer />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <CompletedCoursesContainer />
          </Tab.Pane>
          {/* <Tab.Pane eventKey="fourth">
            <ExamJoiner history={history} />
          </Tab.Pane> */}
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

MyCourses.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
  history: PropTypes.object,
};

MyCourses.defaultProps = {
  docs: [],
  discovering: true,
}
export default MyCourses;
// export default withTracker(() => {
//   if (!Meteor.userId) {
//     return {
//       discovering: true,
//       docs: [],
//     };
//   }
//   const subscription = Meteor.subscribe('courses.viewJoinedVerb');
//   return {
//     discovering: !subscription.ready(),
//     docs: Courses.find().fetch(),
//   };
// })(MyCourses);
