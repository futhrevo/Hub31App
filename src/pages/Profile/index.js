import PropTypes from 'prop-types';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { ProfileCoursesInfo, ProfileInfo, ProfilePasswordChange } from '../../components/Profile';
import ErrorBoundary from '../ErrorBoundary';
import './styles.scss';
import PageHeader from '../../components/PageHeader';

const Profile = ({ user }) => (
  <ErrorBoundary>
    <Container className="flex-fill my-5">
      <div className="Profile">
        <Row>
          <Col xs={12} sm={12} md={9}>
            <PageHeader title="Profile" />
            <Tab.Container id="left-tabs-profile" defaultActiveKey="first">
              <Row className="clearfix">
                <Col sm={4}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Profile Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Courses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Password</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <ProfileInfo />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <ProfileCoursesInfo />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <ProfilePasswordChange />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </Container>
  </ErrorBoundary>
);

Profile.propTypes = {
  user: PropTypes.object,
};
Profile.defaultProps = {
  user: {}
}
export default Profile;
// withTracker(() => ({
//   user: Meteor.user(),
// }))();
