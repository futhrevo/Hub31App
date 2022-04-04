import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AppHelmet from '../../components/AppHelmet';
import { DiscoverCourses, MyCourses } from '../../components/AuthenticatedHome';
import ErrorBoundary from '../ErrorBoundary';
import './styles.scss';

const AuthenticatedHome = (props) => {
  const { isTeacher, isStudent } = useSelector(state => ({
    isTeacher: state.Accounts.isTeacher,
    isStudent: state.Accounts.isStudent
  }));

  return (
    <ErrorBoundary>
      {(isTeacher && !isStudent) ? <Redirect to="/courses" /> : null}
      <div className="Index">
        <AppHelmet title="Home" />
        <MyCourses {...props} />
        <DiscoverCourses />
      </div>
    </ErrorBoundary>
  );
}

export default AuthenticatedHome;
