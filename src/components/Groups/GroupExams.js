import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import urlJoin from '../../modules/url-join';

const handleNav = (id, history) => {
  history.push(urlJoin(history.location.pathname, id));
};

const GroupExamItem = ({ exam, history }) => {
  let ended = false;
  if (exam && Object.prototype.hasOwnProperty.call(exam, 'endedAt')) {
    ended = true;
  }
  return (
    <ListGroup.Item onClick={() => handleNav(exam.id, history)}>
      {exam.title} &nbsp;&nbsp;
      <Badge variant={ended ? 'default' : 'success'}>
        {ended ? 'Ended' : 'Running'}
      </Badge>
    </ListGroup.Item>
  );
};

const GroupExams = ({ exams, history }) => (
  <div>
    <h4>Exams</h4>
    <hr />
    <ListGroup>
      {exams.map(exam => (
        <GroupExamItem key={exam.id} exam={exam} history={history} />
      ))}
    </ListGroup>
  </div>
);

GroupExams.propTypes = {
  exams: PropTypes.array,
  history: PropTypes.object.isRequired,
};

GroupExamItem.propTypes = {
  exam: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default GroupExams;
