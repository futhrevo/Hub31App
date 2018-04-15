import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles';
import FormInput from './FormInput';

const Pwdreset = (props) => (
  <View style={styles.container}>
    <FormInput
      icon="envelope"
      keyboardType="email-address"
      returnKeyType="done"
      placeholder="Email"
      value={props.email}
      editable={!props.isLoading}
      errorMessage={props.emailValid ? null : 'Please enter a valid email address'}
      onChangeText={(email) => {
        props.setEmail(email);
      }}
      refInput={(input) => {
        this.emailInput = input;
      }}
      onSubmitEditing={() => {
        if (props.validateEmail()) {
          props.onDone();
        } else {
          this.emailInput.shake();
        }
      }}
    />
    <Button
      buttonStyle={styles.loginButton}
      title="RECOVER PASSWORD"
      containerStyle={{ marginTop: 32, flex: 0 }}
      activeOpacity={0.8}
      titleStyle={styles.loginTextButton}
      loading={props.isLoading}
      loadingProps={{ size: 'large', color: 'white' }}
      disabled={props.isLoading}
      onPress={() => props.onDone()}
    />

    <View style={styles.footer}>
      <Button
        clear
        title="SIGN IN"
        containerStyle={{ marginTop: 32, flex: 0 }}
        activeOpacity={0.8}
        titleStyle={styles.loginHelpButtons}
        onPress={() => props.onSelect(0)}
        disabled={props.isLoading}
      />
      <Button
        clear
        title="SIGN UP"
        containerStyle={{ marginTop: 32, flex: 0 }}
        activeOpacity={0.8}
        titleStyle={styles.loginHelpButtons}
        onPress={() => props.onSelect(2)}
        disabled={props.isLoading}
      />
    </View>
  </View>
);

Pwdreset.propTypes = {
  onSelect: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  emailValid: PropTypes.bool,
  validateEmail: PropTypes.func,
  isLoading: PropTypes.bool,
  onDone: PropTypes.func,
};

export default Pwdreset;
