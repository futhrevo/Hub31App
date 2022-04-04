import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { iotClient } from '../modules/MTIoTClient';

function querystring(name: string, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute({ component: C, appProps, ...rest }: { component: any, appProps: any }) {
  const redirect = querystring("redirect");

  useEffect(() => {
    iotClient.end(true);
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />}
    />
  );
}

UnauthenticatedRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  exact: PropTypes.bool
}
