import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Badge, Button, ButtonGroup, ButtonToolbar,
  Col, Container,
  FormControl, FormGroup, Modal, Row
} from 'react-bootstrap';
import GroupExams from '../../../components/Groups/GroupExams';
import GroupStudentsList from '../../../components/Groups/GroupStudentList';
import PaperSelection from '../../../components/Groups/PaperSelection';
import Loading from '../../../components/Loading';
import urlJoin from '../../../modules/url-join';
import ErrorBoundary from '../../ErrorBoundary';
import NotFound from '../../NotFound';
import './styles.scss';
import PageHeader from '../../../components/PageHeader';

const handleBack = (history) => {
  history.push('/groups');
};

const handleEdit = (history, match) => {
  history.push(urlJoin(match.url, 'edit'));
};

const handleRemove = (id, history) => {
  if (window.confirm('Are you sure? This is permanent!')) {
    // Meteor.call('groups.del', id, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Group deleted!', 'success');
    //     history.push('/groups');
    //   }
    // });
  }
};

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      paper: {},
      examName: '',
      examDur: 0,
      attempt: 0,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleQselect = this.handleQselect.bind(this);
    this.startGroupQuiz = this.startGroupQuiz.bind(this);
    this.stopGroupQuiz = this.stopGroupQuiz.bind(this);
  }

  handleShow() {
    const { paper } = this.state;
    if (paper && paper.id) {
      this.setState({ paper: {} });
    } else {
      this.setState({ showModal: true });
    }
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleQselect(paper) {
    this.setState({ paper, showModal: false, examName: paper.title });
  }

  startGroupQuiz() {
    const { paper, examName } = this.state;
    let { examDur, attempt } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { doc } = this.props;
    examDur = parseInt(examDur);
    if (examDur < 0) {
      // Bert.alert('Invalid duration', 'duration should be above 0');
      return;
    }
    attempt = parseInt(attempt);
    if (attempt < 0) {
      // Bert.alert('Invalid Attempt Count', 'Attempt should be 0 or above');
      return;
    }
    console.log(`${examDur} ${attempt}`);
    if (paper && paper.id) {
      if (examName.length > 3) {
        // Meteor.call(
        //   'groupQuiz.start',
        //   examName,
        //   doc.id,
        //   paper.id,
        //   examDur,
        //   attempt,
        //   (error) => {
        //     if (error) {
        //       Bert.alert(error.reason, 'danger');
        //     } else {
        //       Bert.alert('exam started', 'success');
        //     }
        //   },
        // );
      }
      // Bert.alert('Exam name should be 3 or more characters', 'danger');
    } else {
      // Bert.alert('No Question Paper selected', 'danger');
    }
  }

  stopGroupQuiz() {
    const { doc } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { id, link } = doc;
    if (window.confirm('Are you sure to stop exam?!')) {
      // Meteor.call('groupQuiz.stop', id, link, (error) => {
      //   if (error) {
      //     Bert.alert(error.reason, 'danger');
      //   } else {
      //     Bert.alert('exam stopped', 'success');
      //   }
      // });
    }
  }

  renderStartExam() {
    const {
      paper, examName, examDur, attempt,
    } = this.state;
    return (
      <div>
        <p>No Exam in Progress. To start a exam</p>
        <h5>1. Select a Question Paper</h5>
        <div>
          {paper && paper.id ? (
            <p>
              {paper.title}
              &nbsp;&nbsp;
              <Badge>{paper.questions.length}</Badge>
            </p>
          ) : null}
          <Button size="sm" variant="primary" onClick={this.handleShow}>
            {paper && paper.id ? 'Remove Paper' : 'Select Paper'}
          </Button>
        </div>
        <h5>2. Add a name for this Exam</h5>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Name for exam"
            value={examName}
            onChange={e => this.setState({ examName: e.target.value })}
          />
        </FormGroup>
        <h5>3. Exam duration (in minutes) - Optional</h5>
        <FormGroup>
          <FormControl
            type="number"
            min="0"
            placeholder="Duration in Minutes"
            value={examDur}
            onChange={e => this.setState({ examDur: e.target.value })}
          />
        </FormGroup>
        <h5>4. Number of attempts - Optional</h5>
        <FormGroup>
          <FormControl
            type="number"
            min="0"
            placeholder="use Zero for infinite attempts"
            value={attempt}
            onChange={e => this.setState({ attempt: e.target.value })}
          />
        </FormGroup>
        <Button size="sm" variant="info" onClick={this.startGroupQuiz}>
          Start Exam
        </Button>
      </div>
    );
  }

  renderStopExam() {
    return (
      <div>
        <p>Exam in Progress</p>
        <Button variant="danger" onClick={this.stopGroupQuiz}>
          Stop Exam
        </Button>
      </div>
    );
  }

  renderModal() {
    const { showModal } = this.state;
    return (
      <Modal show={showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a Group Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaperSelection onQselect={this.handleQselect} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const {
      doc, match, history, loading, loadingExams, exams,
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    return doc ? (
      <ErrorBoundary>
        <Container className="flex-fill my-5">
          <div className="viewGroup">
            <PageHeader title={doc?.title ?? 'Group'}>
              <ButtonToolbar className="float-right">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleBack(history)}
                  >
                    &larr; Groups List
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(history, match)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleRemove(doc.id, history)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </PageHeader>
            <h4>Description</h4>
            <p>{doc && doc.description}</p>
            <Row>
              <Col xs={12} sm={6}>
                <div className="col-box">
                  <h4>Exam</h4>
                  <hr />
                  {doc && doc.active
                    ? this.renderStopExam()
                    : this.renderStartExam()}
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className="col-box">
                  <GroupStudentsList id={doc.id} students={doc.students} />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="col-box">
                {loadingExams ? (
                  <Loading />
                ) : (
                  <GroupExams exams={exams} history={history} />
                )}
              </div>
            </Row>
          </div>
          {this.renderModal()}
        </Container>
      </ErrorBoundary>
    ) : (
      <NotFound />
    );
  }
}

ViewGroup.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingExams: PropTypes.bool.isRequired,
  exams: PropTypes.array,
};

ViewGroup.defaultProps = {
  loading: true,
}
export default ViewGroup;
// withTracker(({ match }) => {
//   const documentId = match.params.id;
//   const subscription = Meteor.subscribe('groups.view', documentId);
//   const subExams = Meteor.subscribe('groupQuiz.list', documentId);
//   return {
//     loading: !subscription.ready(),
//     doc: Groups.findOne(documentId) || {},
//     loadingExams: !subExams.ready(),
//     exams: GroupQuiz.find(
//       { groupId: documentId },
//       { sort: { createdAt: -1 } },
//     ).fetch(),
//   };
// })(ViewGroup);
