import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

const Logo = () => (
  <View style={styles.container}>
    <View style={styles.logobox}>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={require('../../../assets/logo.png')}
      />
    </View>
  </View>
);

export default Logo;
