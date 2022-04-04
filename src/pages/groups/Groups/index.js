import PropTypes from 'prop-types';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GroupsList from '../../../components/Groups/GroupsList';
import ErrorBoundary from '../../ErrorBoundary';
import './styles.scss';
import PageHeader from '../../../components/PageHeader';

const Groups = ({ history }) => (
  <ErrorBoundary>
    <Container className="flex-fill my-5">
      <Row>
        <Col>
          <div id="groups">
            <PageHeader title="Groups">
              <Link to="/groups/new">
                <Button variant="success" className="float-right">
                  New Group
                </Button>
              </Link>
            </PageHeader>
            <GroupsList history={history} />
          </div>
        </Col>
      </Row>
    </Container>
  </ErrorBoundary>
);

Groups.propTypes = {
  history: PropTypes.object,
};

export default Groups;
