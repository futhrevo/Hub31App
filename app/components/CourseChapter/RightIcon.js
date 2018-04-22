import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';

const RightIcon = (props) => {
  if (props.done) {
    return <Icon name="check" type="entypo" />;
  }
  return null;
};

RightIcon.propTypes = {
  done: PropTypes.bool,
};

export default RightIcon;
