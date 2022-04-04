/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';

import ErrorBoundary from '../pages/ErrorBoundary';
import AppNavigation from '../components/AppNavigation';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Routes from "./Routes";

// eslint-disable-next-line no-unused-vars
import { onLogin, onLogout, asStudent, refreshUserData } from '../redux/accounts';

import '../stylesheets/app.scss';

const App = props => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
        dispatch(onLogin());
        dispatch(refreshUserData());
        // await Amplify.PubSub.publish('real-time-hub', { msg: 'Hello to all subscribers!' });
      }
      catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
      setIsAuthenticating(false);
    }

    onLoad();
  }, []);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    dispatch(onLogout());
    props.history.push("/login");
  }, []);

  return (
    <>
      {!isAuthenticating ? (
        <div id="app-root">
          <AppNavigation authenticated={isAuthenticated} onLogout={handleLogout} />
          <div className="flex-fill w-100 min-vh-50">
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      ) : ('')}
    </>
  );
}

export default withRouter(App);
