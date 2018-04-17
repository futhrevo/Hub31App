import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = ({}) => (
  <View style={styles.container}>
    <Text style={styles.header}>Hello World</Text>
  </View>
);

Header.propTypes = {};

export default Header;
