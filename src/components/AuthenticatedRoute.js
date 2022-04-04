import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { initIot, endIot } from '../redux/iot/actions';
import { useDispatch } from 'react-redux';

export default function AuthenticatedRoute({ component: C, appProps, connected, ...rest }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (connected) {
      dispatch(initIot());
      return () => dispatch(endIot(false));
    }
  }, [connected, dispatch]);

  return (
    <Route
      {...rest}
      render={props =>
        appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location
              .search}`}
          />}
    />
  );
}
