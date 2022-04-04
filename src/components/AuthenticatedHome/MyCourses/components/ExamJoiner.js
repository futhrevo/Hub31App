import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import PageHeader from '../../../PageHeader';

class ExamJoiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      quiz: {},
      id: '',
    };
    this.fetchGroupInfo = this.fetchGroupInfo.bind(this);
    this.renderGroupInfo = this.renderGroupInfo.bind(this);
    this.renderQuizInfo = this.renderQuizInfo.bind(this);
    this.gotoQuiz = this.gotoQuiz.bind(this);
  }

  getValidation() {
    const { length } = this.state.id;
    if (length === 17) return 'success';
    if (length > 0) return 'error';
    return null;
  }

  fetchGroupInfo() {
    const { id } = this.state;
    if (id.length < 17) {
      // Bert.alert('Code is Invalid', 'danger');
    }
    // Meteor.call('groupQuiz.public', id, (error, result) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     const { group, quiz } = result;
    //     this.setState({ group, quiz });
    //   }
    // });
  }

  gotoQuiz() {
    const { group } = this.state;
    const { history } = this.props;
    history.push(`/group-exam/${group.id}`);
  }

  renderGroupInfo() {
    const { group } = this.state;
    const { title, active, description } = group;
    if (Object.keys(group).length === 0 && group.constructor === Object) {
      return null;
    }
    return (
      <div>
        <h5>{title}</h5>
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
    const { quiz } = this.state;
    const { title, createdAt } = quiz;
    return (
      <Alert variant="success">
        <h6>{title}</h6>
        <p>Exam started on {createdAt}</p>
        <p>
          <Button variant="success" onClick={this.gotoQuiz}>
            Start Exam
          </Button>
        </p>
      </Alert>
    );
  }

  // TODO: inout validation required for ID input
  render() {
    const { id } = this.state;
    return (
      <div className="examJoiner">
        <PageHeader title="JOIN EXAM" />
        <FormGroup>
          <InputGroup>
            <FormControl
              placeholder="Enter Id provided by Instructor"
              aria-label="Enter Id provided by Instructor"
              aria-describedby="basic-addon2"
              value={id}
              onChange={e => this.setState({ id: e.target.value })}
              required
            />
            <FormControl.Feedback />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.fetchGroupInfo}>
                Join exam
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
        {this.renderGroupInfo()}
      </div>
    );
  }
}

ExamJoiner.propTypes = {
  history: PropTypes.object,
};
export default ExamJoiner;
