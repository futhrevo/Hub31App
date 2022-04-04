import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getNameProfession } from '../../modules/utils';
import Loading from '../Loading';

const ProfileCoursesInfo = ({ courses, loading1 }) => {
  if (loading1) {
    return <Loading />;
  }
  if (courses.length === 0) {
    return (
      <Alert variant="info">
        <strong>Empty here!</strong> Nothing to show.
      </Alert>
    )
  }
  return (
    <ListGroup>
      {courses.map(data => {
        const { name, profession } = getNameProfession(data && data.title);
        return (
          <LinkContainer to={`/course/${data.id}`} key={data.id}>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              {`${name}  -  ${profession}`}
            </button>
          </LinkContainer>
        )
      })}
    </ListGroup>
  );
};

ProfileCoursesInfo.propTypes = {
  courses: PropTypes.array,
  loading1: PropTypes.bool,
};

ProfileCoursesInfo.defaultProps = {
  loading1: false,
  courses: []
}
export default ProfileCoursesInfo;

