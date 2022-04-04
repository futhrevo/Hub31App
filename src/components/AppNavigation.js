import React from 'react';
import AuthenticatedNavigation from './AuthenticatedNavigation';

const AppNavigation = ({ authenticated, onLogout }) => {
  if (authenticated) {
    return <AuthenticatedNavigation onLogout={onLogout} />
  } else {
    return null;
  }
}

export default AppNavigation;
