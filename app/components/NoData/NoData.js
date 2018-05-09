import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { View, Text, Dimensions } from 'react-native';

import styles from './styles';

const NoData = (props) => {
  const { width } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Icon
        name="graduation-cap"
        type="font-awesome"
        color="#80ff00"
        size={width * 0.2}
        containerStyle={styles.icon}
      />
      <Text style={styles.msg}>{props.msg}</Text>
    </View>
  );
};

NoData.propTypes = {
  msg: PropTypes.string,
};
export default NoData;
