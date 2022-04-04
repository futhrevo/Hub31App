import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardDeck, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchDiscoverCourses } from '../../../redux/programs/programsSlice';
import Loading from '../../Loading';
import CourseCard from './components/CourseCard';
import PageHeader from '../../PageHeader';

const DiscoverCourses = ({ docs, discovering, fetchDiscoverCourses }) => {
  useEffect(() => {
    fetchDiscoverCourses();
  }, [fetchDiscoverCourses])
  return (
    <div className="InDiscover m-5">
      <PageHeader title="DISCOVER COURSES" />
      {docs.length > 0 ? (
        <CardDeck>
          {docs &&
            docs.map((id) => (
              <CourseCard
                key={id}
                id={id}
              />
            ))}
        </CardDeck>
      ) : !discovering && (<Alert variant="info">
        Come back after some time for new recommendations
      </Alert>)}
      {discovering ? <Loading /> : null}
    </div>
  )
};

DiscoverCourses.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

DiscoverCourses.defaultProps = {
  docs: [], discovering: true
}

const mapStateToProps = (state) => ({
  discovering: state?.Programs?.disPending,
  docs: state?.Programs?.discover,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchDiscoverCourses: () => {
      dispatch(fetchDiscoverCourses())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverCourses);

// export default withTracker(() => {
//   const subscription = Meteor.subscribe('courses.discover');
//   const pref = EnCourses.find(
//     { studentid: Meteor.userId() },
//     { fields: { courseId: 1 } },
//   ).fetch();
//   let omits = [];
//   if (pref) {
//     omits = _.pluck(pref, 'courseId');
//   }
//   return {
//     discovering: !subscription.ready(),
//     docs: Courses.find({ id: { $nin: omits } }, { limit: 3 }).fetch(),
//   };
// })(DiscoverCourses);
