import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';
import Meteor, { createContainer } from 'react-native-meteor';

const RightIcon = (props) => {
  const { res } = props;
  const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
  if (done) {
    return <Icon name="check" type="entypo" />;
  }
  return null;
};

RightIcon.propTypes = {
  res: PropTypes.object,
};

export default createContainer((props) => {
  return {
    res: Meteor.collection('StuResults').findOne({ material_id: props.matId }) || {},
  };
}, RightIcon);
