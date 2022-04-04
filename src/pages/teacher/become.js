import { Col, Container, Row } from 'react-bootstrap';
import AppHelmet from '../../components/AppHelmet';
import PublicNavigation from '../../components/PublicNavigation';
import ErrorBoundary from '../ErrorBoundary';

const BecomeTeacher = () => {
  return (
    <ErrorBoundary>
      <Container className="onboard flex-fill my-5" fluid>
        <AppHelmet title="Become Teacher" />
        <PublicNavigation />
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={8}>
            <div style={{ margin: '12px' }}>
              <h4 className="centerText">Become Teacher @ Hub31</h4>
              <hr className="colorgraph" />
              <p>Hub 31 platform enables many independent teachers like you to reach millions of learners worldwide.</p>
              <p>We provide e-learning as a service, so that you dont need to handle the intricacies involved and requires no staff to maintain. Once you create your course everything will be handled by us including payments, maintainence and distribution to any number of learners anywhere</p>
              <p>Write to us at <a href="mailto:admin@hub31.com">admin@hub31.com</a> with course details to get started</p>
            </div>
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default BecomeTeacher;
