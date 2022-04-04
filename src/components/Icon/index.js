import React from 'react';
import PropTypes from 'prop-types';

const getIconStyle = iconStyle => ({
  regular: 'far',
  solid: 'fas',
  light: 'fal',
  brand: 'fab',
}[iconStyle]);

const Icon = ({ icon, iconStyle, className = '' }) => (
  <i className={`${getIconStyle(iconStyle)} fa-${icon} ${className}`} />
);

Icon.defaultProps = {
  iconStyle: 'regular',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconStyle: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
