import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Alert, Form } from 'react-bootstrap';
import { RootState } from "../../../../redux/store";
import { CSessionItem } from "../../../../redux/courses/sessionReducer";

const SessionSelect = ({ path, courseId }: { path: string, courseId: string }) => {
  let history = useHistory();
  let match = useRouteMatch<{ sessId: string }>(path);
  const sessions = useSelector((state: RootState) => state.Courses[courseId]?.CSessions ?? []);
  let sessId = '';
  if (match) {
    sessId = match.params.sessId;
  }

  if (sessions.length === 0) {
    return <Alert variant="warning">Add a Session first</Alert>;
  }

  return (
    <Form.Group controlId="session_select">
      <Form.Label>Select a Session</Form.Label>
      <Form.Control
        as="select"
        value={sessId}
        onChange={e => {
          history.replace(path.replace(':sessId', e.target.value))
        }}
      >
        <option value="">Select a Session here</option>
        {sessions.map((session: CSessionItem, index: number) => (
          <option key={session.cAt.toString()} value={session.cAt.toString()}>
            {`${index + 1} - ${session.title}`}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default SessionSelect;
