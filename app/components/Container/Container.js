import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';

import styles from './styles';

const Container = ({ children, backgroundColor, safe }) => {
  const containerStyles = [styles.container];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }
  if (safe) {
    return <SafeAreaView style={containerStyles}>{children}</SafeAreaView>;
  }
  return <View style={containerStyles}>{children}</View>;
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
  safe: PropTypes.bool,
};

export default Container;
