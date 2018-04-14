import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import FormInput from './FormInput';

const Pwdreset = () => (
  <View style={styles.container}>
    <FormInput
      icon="envelope"
      keyboardType="email-address"
      returnKeyType="next"
      placeholder="Email"
      refInput={(input) => {
        this.emailInput = input;
      }}
    />
    <Button
      buttonStyle={styles.loginButton}
      title="RECOVER PASSWORD"
      containerStyle={{ marginTop: 32, flex: 0 }}
      activeOpacity={0.8}
      titleStyle={styles.loginTextButton}
    />

    <View style={styles.footer}>
      <Button
        clear
        title="SIGN IN"
        containerStyle={{ marginTop: 32, flex: 0 }}
        activeOpacity={0.8}
        titleStyle={styles.loginHelpButtons}
      />
      <Button
        clear
        title="SIGN UP"
        containerStyle={{ marginTop: 32, flex: 0 }}
        activeOpacity={0.8}
        titleStyle={styles.loginHelpButtons}
      />
    </View>
  </View>
);

export default Pwdreset;
