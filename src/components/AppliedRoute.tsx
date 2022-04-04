import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

export default function AppliedRoute({ component: C, appProps, ...rest }: { component: any, appProps: any }) {
  return (
    <Route {...rest} render={props => <C {...props} {...appProps} />} />
  );
}

AppliedRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  exact: PropTypes.bool
}
