import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, ListGroup, Badge, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CourseAddSession from './components/CourseAddSession';
import { endSession } from '../../../api/csessions';
import { endSession as endSess } from '../../../redux/courses/sessionActions';
import { getHMSString } from '../../../modules/utils';

const CourseSessionItem = ({ session, ended = true, onStop, courseId, showEdit }) => {
  const [date, setDate] = React.useState('checking');
  const [edit, setEdit] = React.useState(false);

  useEffect(() => {
    var timerID = ended ? '' : setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    const newstr = getHMSString(session.eAt - Date.now());
    setDate(newstr);
  }
  if (edit) {
    return <CourseAddSession courseId={courseId} doc={session} onSuccess={() => setEdit(false)} />
  }
  return (
    <ListGroup.Item variant={ended ? '' : 'success'}>
      <div>{session.title}
        <Badge variant={ended ? 'default' : 'success'} className="ml-3">
          {ended ? 'Ended' : 'Running'}
        </Badge>
        {ended ? (
          <div className="float-right">
            <Link to={`/courses/${courseId}/sess/${session.cAt}`}>
              <Button variant="link" className="text-decoration-none">Students<Badge variant="default" className="ml-1">{session.roll + 1}</Badge></Button>
            </Link>
          </div>
        ) : (
          <ButtonGroup className="float-right">
            { showEdit ? <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-decoration-none">Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEdit(true)}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={() => onStop(session)}>End Session</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> :
              <Link to={`/courses/${courseId}/sess/${session.cAt}`}>
                <Button variant="link" className="text-decoration-none">Students<Badge variant="info" className="ml-1">{session.roll + 1}</Badge></Button>
              </Link>}
          </ButtonGroup>
        )}
      </div>
      {ended ? (<small>{`${(new Date(session.cAt)).toLocaleString()}\u00A0\u00A0→\u00A0\u00A0${(new Date(session.eAt)).toLocaleString()}`}</small>) : (<small>{date} remaining</small>)}


    </ListGroup.Item>
  )
};

const CourseSessionsList = ({ sessions, running, courseId, edit }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  if (sessions.length === 0) {
    return <Alert variant="warning">No Sessions</Alert>;
  }

  const stopSession = async (session) => {
    try {
      await endSession(courseId, session.cAt);
      alert.success("Session Ended!");
      dispatch(endSess(session.courseId, session.cAt));
    } catch (e) {
      alert.error("Unable to end session");
    }
  };
  return (
    <ListGroup>
      {sessions.map(session => {
        return (
          <CourseSessionItem
            key={session.cAt}
            courseId={courseId}
            session={session}
            ended={session.eAt < Date.now()}
            onStop={stopSession}
            showEdit={edit}
          />
        )
      })}
    </ListGroup>
  );
};

const CourseSessions = ({ sessions, course, edit }) => {
  const running = isSessionRunning(sessions);
  return (
    <div>
      {running ? null : <CourseAddSession courseId={course.id} />}
      <CourseSessionsList sessions={sessions} running={running} courseId={course.id} edit={edit} />
    </div>
  )
};

CourseSessions.propTypes = {
  sessions: PropTypes.array,
  course: PropTypes.object,
  edit: PropTypes.bool,
};

CourseSessionsList.propTypes = CourseSessions.propTypes;

CourseSessionItem.propTypes = {
  session: PropTypes.object,
  ended: PropTypes.bool,
  onStop: PropTypes.func,
};

CourseSessions.defaultProps = {
  sessions: [],
}
export default CourseSessions;

function isSessionRunning(sessions) {
  return sessions.find(el => el.eAt > Date.now());
}
