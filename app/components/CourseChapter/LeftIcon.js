import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';

const LeftIcon = (props) => {
  switch (props.material_type) {
    case 0:
      return <Icon name="clipboard" type="entypo" />;
    case 1:
      return <Icon name="video" type="entypo" />;
    case 2:
      return <Icon name="text-document" type="entypo" />;
    default:
      return <Icon name="text-document" type="entypo" />;
  }
};

LeftIcon.propTypes = {
  material_type: PropTypes.number,
};
export default LeftIcon;
