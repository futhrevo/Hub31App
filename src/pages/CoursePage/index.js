import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';
import CoursePageContent from '../../components/CoursePageContent';
import Loading from '../../components/Loading';
import { fetchStudentCourse } from '../../redux/courses/actions';
import NotFound from '../NotFound';
import './styles.scss';

const CoursePage = (props) => {
  const { match, fetchStudentCourse, resolving } = props;
  useEffect(() => {
    fetchStudentCourse(match.params.id);
  }, [match.params.id, fetchStudentCourse]);

  if (resolving === undefined || resolving) {
    return <Loading />;
  }
  if (!props.course) {
    return <NotFound />;
  }
  return (<ErrorBoundary>
    <CoursePageContent {...props} />
  </ErrorBoundary>);
};

CoursePage.propTypes = {
  match: PropTypes.object.isRequired,
  resolving: PropTypes.bool,
  course: PropTypes.object,
};

CoursePage.defaultProps = {
  resolving: true,
}

const mapStateToProps = (state, { match }) => ({
  course: state?.Courses[match.params.id]?.Course ?? {},
  resolving: state?.Courses[match.params.id]?.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchStudentCourse: id => {
      dispatch(fetchStudentCourse(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
// withTracker(({ match }) => CourseResolver(match))(CoursePage);
