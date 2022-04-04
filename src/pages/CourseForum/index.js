import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from '../../components/Loading';
import urlJoin from '../../modules/url-join';
import { fetchCourseForum } from '../../redux/forums/forumActions';
import ErrorBoundary from '../ErrorBoundary';
import ForumFeed from './ForumFeed';
import NewDiscussion from './NewDiscussion';
import SingleDiscussion from './SingleDiscussion';

// https://github.com/shoumma/ReForum
const CourseForum = (props) => {
  const { loading, forums, match, courseId, dispatchFetchForum } = props;
  useEffect(() => {
    dispatchFetchForum(courseId);
  }, [courseId, dispatchFetchForum])
  if (loading) {
    return <Loading />;
  }
  if (forums.length === 0) {
    return <Alert variant="info"> No Forums Created Yet</Alert>;
  }
  return (
    <ErrorBoundary>
      <Switch>
        <Route
          path={urlJoin(match.url, ':forum_slug/discus/:discus_slug')}
          render={routeProps => (
            <SingleDiscussion {...routeProps} courseId={courseId} />
          )}
        />
        <Route
          path={urlJoin(match.url, ':forum_slug/new')}
          render={routeProps => (
            <NewDiscussion {...routeProps} courseId={courseId} />
          )}
        />
        <Route
          path={urlJoin(match.url, ':forum_slug')}
          render={routeProps => <ForumFeed {...routeProps} courseId={courseId} />}
        />
        <Redirect to={urlJoin(match.url, "general")} />
      </Switch>
    </ErrorBoundary>
  );
};

CourseForum.propTypes = {
  forums: PropTypes.array,
  loading: PropTypes.bool,
  match: PropTypes.object,
  courseId: PropTypes.string,
};

CourseForum.defaultProps = {
  loading: true
}

const mapStateToProps = (state, { courseId }) => ({
  loading: state?.Courses[courseId]?.Forums?.pending,
  forums: state?.Courses[courseId]?.Forums?.byList ?? [],
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchForum: (courseId) => {
      dispatch(fetchCourseForum(courseId))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseForum);
// export default withTracker((props) => {
//   const { courseId } = props;
//   const subscription = Meteor.subscribe('forums.list', courseId);
//   return {
//     loading: !subscription.ready(),
//     forums: Forums.find(
//       { courseId: courseId },
//       { sort: { createdAt: 1 } },
//     ).fetch(),
//   };
// })(CourseForum);
