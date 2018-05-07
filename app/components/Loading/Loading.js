import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#ff8100" />
  </View>
);

export default Loading;
