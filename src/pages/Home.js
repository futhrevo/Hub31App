import PropTypes from 'prop-types';
import AuthenticatedHome from './AuthenticatedHome';
import ErrorBoundary from './ErrorBoundary';
import PublicHome from './PublicHome';

const Home = props => (
  <ErrorBoundary>
    <div className="flex-fill w-100">
      <div className="Index">
        {!props.isAuthenticated ? <PublicHome /> : <AuthenticatedHome {...props} />}
      </div>
    </div>
  </ErrorBoundary>
);

Home.propTypes = {
  authenticated: PropTypes.bool,
};

export default Home;
