import PropTypes from 'prop-types';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import GroupEditor from '../../components/Groups/GroupEditor';
import ErrorBoundary from '../ErrorBoundary';
import PageHeader from '../../components/PageHeader';

const handleBack = (history) => {
  history.push('/groups');
};

const NewGroup = ({ history }) => (
  <ErrorBoundary>
    <Container className="flex-fill my-5">
      <div className="newGroup">
        <PageHeader title="New Group">
          <ButtonToolbar className="float-right">
            <ButtonGroup size="sm">
              <Button variant="danger" onClick={() => handleBack(history)}>
                Cancel
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </PageHeader>
        <GroupEditor history={history} />
      </div>
    </Container>
  </ErrorBoundary>
);

NewGroup.propTypes = {
  history: PropTypes.object,
};

export default NewGroup;
