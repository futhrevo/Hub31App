import React from 'react';
import PropTypes from 'prop-types';
import { Alert, CardColumns } from 'react-bootstrap';

import CourseListRenderContainer from '../components/CourseListRender';
import Loading from '../../../../Loading';
import PageHeader from '../../../../PageHeader';

const CompletedCourses = ({ docs, discovering }) => (!discovering ? (
  <div className="complcourse">
    <PageHeader title="COMPLETED COURSES" />
    {docs.length > 0 ? (
      <CardColumns>
        {docs.map((data, index) => (
          <CourseListRenderContainer data={data} key={index} />
        ))}
      </CardColumns>
    ) : (
      <Alert variant="info">
        <strong>Empty here!</strong> Nothing to show.
      </Alert>
    )}
  </div>
) : (
  <Loading />
));

CompletedCourses.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

CompletedCourses.defaultProps = {
  docs: [],
  discovering: false
}
export default CompletedCourses;
// export default (CompletedCoursesContainer = withTracker(() => {
//   const subscription = Meteor.subscribe('courses.viewJoined');
//   const pref = EnCourses.find(
//     { done: true },
//     { fields: { courseId: 1 } },
//   ).fetch();
//   let ids = [];
//   if (pref) {
//     ids = _.pluck(pref, 'courseId');
//   }
//   return {
//     discovering: !subscription.ready(),
//     docs: Courses.find({ id: { $in: ids } }, { sort: { name: 1 } }).fetch(),
//   };
// })(CompletedCourses));
