import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const InputHint = ({ children }) => (
  <div className="InputHint">
    {children}
  </div>
);

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
