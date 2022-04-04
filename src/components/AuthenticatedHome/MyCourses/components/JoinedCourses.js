import React from 'react';
import PropTypes from 'prop-types';
import { Alert, CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';

import CourseListRenderContainer from './components/CourseListRender';
import Loading from '../../../Loading';
import PageHeader from '../../../PageHeader';

const JoinedCourses = ({ docs, discovering }) => (
  <div className="alljoined">
    <PageHeader title="ALL ENROLLED" />
    {docs.length > 0 ? (
      <CardColumns>
        {docs.map((data, index) => (
          <CourseListRenderContainer id={data} key={index} />
        ))}
      </CardColumns>
    ) : !discovering && (
      <Alert variant="info">
        <strong>Empty here!</strong> Nothing to show.
      </Alert>
    )}
    {discovering ? <Loading /> : null}
  </div>
);

JoinedCourses.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

JoinedCourses.defaultProps = {
  docs: [],
  discovering: false,
};

const mapStateToProps = (state) => ({
  discovering: state?.Programs?.joinPending,
  docs: state?.Programs?.joined,
})

export default connect(mapStateToProps)(JoinedCourses);
// export default (JoinedCoursesContainer = withTracker(() => {
//   const subscription = Meteor.subscribe('courses.viewJoined');
//   const pref = EnCourses.find({}, { fields: { courseId: 1 } }).fetch();
//   let ids = [];
//   if (pref) {
//     ids = _.pluck(pref, 'courseId');
//   }
//   return {
//     discovering: !subscription.ready(),
//     docs: Courses.find({ id: { $in: ids } }, { sort: { name: 1 } }).fetch(),
//   };
// })(JoinedCourses));
