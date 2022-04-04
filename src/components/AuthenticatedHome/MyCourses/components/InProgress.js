import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchJoinedCourses } from '../../../../redux/programs/programsSlice';
import CourseListRenderContainer from './components/CourseListRender';
import Loading from '../../../Loading';
import PageHeader from '../../../PageHeader';

const InProgress = ({ docs, discovering, fetchJoinedCourses }) => {
  useEffect(() => {
    fetchJoinedCourses();
  }, [fetchJoinedCourses])
  return (
    <div className="inprogress">
      <PageHeader title="IN PROGRESS" />
      {docs.length > 0 ? (
        <div className="course-group">
          <CardColumns>
            {docs.map((data, index) => (
              <CourseListRenderContainer id={data} key={index} />
            ))}
          </CardColumns>
        </div>
      ) : !discovering && (
        <Alert variant="info">
          <strong>Empty here!</strong> Nothing to show.
        </Alert>
      )}
      {discovering ? <Loading /> : null}
    </div>
  )
}

InProgress.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

InProgress.defaultProps = {
  docs: [],
  discovering: false,
};

const mapStateToProps = (state) => ({
  discovering: state?.Programs?.joinPending,
  docs: state?.Programs?.joined.slice(0, 3),
})

const mapDispatchToProps = dispatch => {
  return {
    fetchJoinedCourses: () => {
      dispatch(fetchJoinedCourses())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);

// export default (InProgressContainer = withTracker(() => {
//   const subscription = Meteor.subscribe('courses.viewJoined');
//   const pref = EnCourses.find(
//     { done: false },
//     { fields: { courseId: 1, status_date: 1 }, sort: { status_date: -1 } },
//   ).fetch();
//   let ids = [];
//   if (pref) {
//     ids = _.pluck(pref, 'courseId').slice(0, 3);
//   }
//   return {
//     discovering: !subscription.ready(),
//     docs: Courses.find({ id: { $in: ids } }, { limit: 3 }).fetch(),
//   };
// })(InProgress));
