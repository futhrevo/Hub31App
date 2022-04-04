import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import './SearchInput.scss';

const SearchInput = ({ placeholder, onKeyUp }) => (
  <div className="search-input">
    <Icon iconStyle="solid" icon="search" />
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder={placeholder}
      onKeyUp={onKeyUp}
    />
  </div>
);

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
};

export default SearchInput;
