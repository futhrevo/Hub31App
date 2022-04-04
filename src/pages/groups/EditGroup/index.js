import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col, Container,
  FormControl, FormGroup,
  InputGroup, Row
} from 'react-bootstrap';
import GroupEditor from '../../../components/Groups/GroupEditor';
import GroupStudentsList from '../../../components/Groups/GroupStudentList';
import Loading from '../../../components/Loading';
import ErrorBoundary from '../../ErrorBoundary';
import NotFound from '../../NotFound';
import './styles.scss';
import PageHeader from '../../../components/PageHeader';


const cancelEdit = (id, history) => {
  history.push(`/groups/${id}`);
};

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { doc, history, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return doc ? (
      <ErrorBoundary>
        <Container className="flex-fill my-5">
          <div className="editGroup">
            <PageHeader title="Editing">
              <ButtonToolbar className="float-right">
                <ButtonGroup size="sm">
                  <Button
                    variant="danger"
                    onClick={() => cancelEdit(doc.id, history)}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </PageHeader>
            <Row>
              <Col xs={12} sm={6}>
                <div className="col-box">
                  <GroupStudentsList students={doc.students} id={doc.id} />
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="col-box">
                  <h4>Question Paper</h4>
                  <FormGroup>
                    <InputGroup>
                      <FormControl type="text" />
                      <InputGroup.Append>
                        <Button variant="primary">Add Paper by Id</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </FormGroup>
                </div>
              </Col>
            </Row>
            <GroupEditor doc={doc} history={history} />
          </div>
        </Container>
      </ErrorBoundary>
    ) : (
      <NotFound />
    );
  }
}

EditGroup.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
};
EditGroup.defaultProps = {
  loading: true,
}
export default EditGroup;
// withTracker(({ match }) => {
//   const documentId = match.params.id;
//   if (typeof documentId === 'undefined') {
//     return {
//       loading: true,
//     };
//   }
//   const subscription = Meteor.subscribe('groups.view', documentId);
//   return {
//     loading: !subscription.ready(),
//     doc: Groups.findOne(documentId),
//   };
// })(EditGroup);
