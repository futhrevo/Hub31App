import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
  Badge,
} from 'react-bootstrap';
import Loading from '../../Loading';
import StudentItem from './components/StudentItem';

class GroupStudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stuInput: '',
      stuLoading: '',
    };
  }

  addStudent() {
    // const { id } = this.props;
    const { stuInput } = this.state;
    if (stuInput.length < 3) {
      // Bert.alert('No Student Exist', 'danger');
      return;
    }
    this.setState({ stuLoading: true });
    // Meteor.call('groups.addStu', id, stuInput.trim(), (error) => {
    //   this.setState({ stuLoading: false });
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     this.setState({ stuInput: '' });
    //   }
    // });
  }

  removeStudent(sid) {
    // const { id } = this.props;
    // Meteor.call('groups.removeStu', id, sid, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   }
    // });
  }

  render() {
    const { students } = this.props;
    const { stuLoading, stuInput } = this.state;
    return (
      <div>
        <h4>
          Students &nbsp;&nbsp;
          <Badge>{students.length}</Badge>
        </h4>
        <hr />
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={stuInput}
              placeholder="Add Student by Id"
              onChange={e => this.setState({ stuInput: e.target.value.trim() })}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={() => this.addStudent()}>
                Add Student
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
        <ListGroup>
          {students.map(id => (
            <ListGroup.Item key={id} className="clearfix">
              <StudentItem id={id} />
              <span className="float-right">
                <Button
                  variant="danger"
                  onClick={() => this.removeStudent(id)}
                >
                  X
                </Button>
              </span>
            </ListGroup.Item>
          ))}
          {stuLoading ? <Loading /> : null}
        </ListGroup>
      </div>
    );
  }
}

GroupStudentsList.propTypes = {
  students: PropTypes.array,
  id: PropTypes.string,
};

GroupStudentsList.defaultProps = {
  loading: true,
}
export default GroupStudentsList;
// withTracker(({ id }) => {
//   if (typeof id === 'undefined') {
//     return {
//       loading: true,
//     };
//   }
//   const subscription = Meteor.subscribe('group.students', id);
//   return {
//     loading: !subscription.ready(),
//   };
// })();
