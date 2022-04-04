import React from 'react';
import PropTypes from 'prop-types';

const FormErrorMsg = props => (
  <div className="invalid-feedback d-inline">{props.children}</div>
);

FormErrorMsg.propTypes = {
  children: PropTypes.node,
};
export default FormErrorMsg;
