import React from 'react';
import {
  ListGroup, Alert, Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import Loading from '../Loading';

const handleNav = (id, history) => {
  history.push(`/groups/${id}`);
};

const GroupsList = (props) => {
  const { groups, loading, history } = props;
  if (loading) {
    return <Loading />;
  }
  if (groups.length === 0) {
    return <Alert variant="warning">No Groups created yet.</Alert>;
  }
  return (
    <ListGroup className="groupsList">
      {groups.map(({
        id, title, description, active, students,
      }) => (
          <ListGroup.Item
            key={id}
            onClick={() => handleNav(id, history)}
          >
            <div className="list-text">
              <div>
                <strong>{title}</strong>
                &nbsp;&nbsp;
              <Badge variant="info">{`${students.length} Students`}</Badge>
                {' '}
                {active ? <Badge variant="success">Running</Badge> : null}
              </div>
              {description}
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

GroupsList.propTypes = {
  groups: PropTypes.array,
  history: PropTypes.object,
  loading: PropTypes.bool,
};

GroupsList.defaultProps = {
  loading: true,
  groups: []
}
export default GroupsList;
