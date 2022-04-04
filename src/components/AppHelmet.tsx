import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


const AppHelmet = ({ title }: { title: string }) => (
  <Helmet>
    <title>{`${title} | ${process.env.REACT_APP_WEBSITE_NAME || 'Hub31'}`}</title>
  </Helmet>
);

AppHelmet.propTypes = {
  title: PropTypes.string,
};

export default AppHelmet;
