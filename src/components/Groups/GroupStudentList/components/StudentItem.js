import React from 'react';
import PropTypes from 'prop-types';

const StudentItem = ({ id, student }) => {
  if (student) {
    return (
      <span>
        {`${student.profile.name.last} ${student.profile.name.first}`}
      </span>
    );
  }
  return <span>{id}</span>;
};

StudentItem.propTypes = {
  id: PropTypes.string,
  student: PropTypes.object,
};

StudentItem.defaultProps = {
  student: {}
}

export default StudentItem;
// withTracker(({ id }) => {
//   const student = Meteor.users.findOne(id);
//   return {
//     student,
//   };
// })(StudentItem);
