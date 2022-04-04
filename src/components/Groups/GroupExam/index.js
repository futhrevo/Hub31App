import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Container, Row, Col, Table, Button,
} from 'react-bootstrap';
import timeago from 'epoch-timeago';
import GroupExamView from './components/GroupExamView';
import PageHeader from '../../PageHeader';

class GroupExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      quiz: {},
      paper: {},
      result: {},
      showQuiz: false,
    };
    this.renderGroupInfo = this.renderGroupInfo.bind(this);
    this.renderQuizInfo = this.renderQuizInfo.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  componentDidMount() {
    // const { groupId } = this.props;
    // Meteor.call('groupQuiz.public', groupId, (error, res) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     const {
    //       group, quiz, paper, result,
    //     } = res;
    //     this.setState({
    //       group,
    //       quiz,
    //       paper,
    //       result,
    //     });
    //   }
    // });
  }

  startQuiz() {
    this.setState({ showQuiz: true });
  }

  renderGroupInfo() {
    const { group } = this.state;
    const { title, active, description } = group;
    if (Object.keys(group).length === 0 && group.constructor === Object) {
      return null;
    }
    return (
      <div>
        <PageHeader title={title} />

        <p>{description}</p>
        {active ? (
          this.renderQuizInfo()
        ) : (
          <Alert variant="info">No Exam in Progress</Alert>
        )}
      </div>
    );
  }

  renderQuizInfo() {
    const { quiz, paper, result } = this.state;
    const {
      title, createdAt, dur, attempt,
    } = quiz;
    let marks = [];
    if (typeof result !== 'undefined') {
      marks = result.marks;
    }
    const actiontext = 'Start Quiz';
    let hideAction = false;
    if (paper.total === 0) {
      hideAction = true;
    } else if (attempt !== 0 && attempt <= marks.length) {
      hideAction = true;
    }

    return (
      <Row>
        <Col xs={12} md={{ span: 4, offset: 4 }} className="mx-auto">
          <div className="card1 fill-light-acc">
            <div className="card1-body">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img alt="GAPE logo" src="/GALogo.png" height="40" width="40" />
                <p>
                  <strong>GAPE</strong>
                </p>
              </div>
              <hr />
              <Table className="borderless">
                <tbody>
                  <tr>
                    <td>Topic</td>
                    <td>{title}</td>
                  </tr>
                  <tr>
                    <td>Started</td>
                    <td>{timeago(createdAt)}</td>
                  </tr>
                  <tr>
                    <td>Questions</td>
                    <td>{paper.total}</td>
                  </tr>
                  {dur > 0 ? (
                    <tr>
                      <td>Duration</td>
                      <td>{dur} Minutes</td>
                    </tr>
                  ) : null}
                  {attempt > 0 ? (
                    <tr>
                      <td>Allowed Attempts</td>
                      <td>{attempt}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>Attempt</td>
                    <td>{marks.length}</td>
                  </tr>
                  {marks.length === 0 ? null : (
                    <tr>
                      <td>Max Score</td>
                      <td>{Math.max.apply(null, marks)}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {!hideAction ? (
                <div className="card1-footer text-center">
                  <Button variant="light" onClick={this.startQuiz}>
                    {actiontext}
                  </Button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    const { showQuiz } = this.state;
    return (
      <div className="group-exam">
        <Container>
          {showQuiz ? (
            <GroupExamView {...this.state} />
          ) : (
            this.renderGroupInfo()
          )}
        </Container>
      </div>
    );
  }
}

GroupExam.propTypes = {
  groupId: PropTypes.string,
};
GroupExam.defaultProps = {
  groupId: ''
}
export default GroupExam;
// withTracker(({ match }) => {
//   const groupId = match.params.id;
//   return {
//     groupId,
//   };
// })(GroupExam);
