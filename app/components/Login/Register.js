import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles';
import FormInput from './FormInput';

const Register = (props) => (
  <View style={styles.container}>
    <FormInput
      icon="envelope"
      keyboardType="email-address"
      returnKeyType="next"
      placeholder="Email"
      editable={!props.isLoading}
      value={props.email}
      errorMessage={props.emailValid ? null : 'Please enter a valid email address'}
      onChangeText={(email) => {
        props.setEmail(email);
      }}
      refInput={(input) => {
        this.emailInput = input;
      }}
      onSubmitEditing={() => {
        if (props.validateEmail()) {
          this.passwordInput.focus();
        } else {
          this.emailInput.shake();
        }
      }}
    />
    <FormInput
      icon="lock"
      placeholder="Password"
      secureTextEntry
      returnKeyType="next"
      editable={!props.isLoading}
      value={props.password}
      errorMessage={props.passwordValid ? null : 'Please enter at least 8 characters'}
      onChangeText={(pass) => {
        props.setPassword(pass);
      }}
      refInput={(input) => {
        this.passwordInput = input;
      }}
      onSubmitEditing={() => {
        if (props.validatePassword()) {
          this.confPasswordInput.focus();
        } else {
          this.passwordInput.shake();
        }
      }}
    />
    <FormInput
      icon="lock"
      placeholder="Confirm Password"
      secureTextEntry
      keyboardAppearance="dark"
      editable={!props.isLoading}
      value={props.confirmationPassword}
      errorMessage={
        props.confirmationPasswordValid ? null : 'The password fields are not identical'
      }
      onChangeText={(pass) => {
        props.setConfirmPassword(pass);
      }}
      refInput={(input) => {
        this.confPasswordInput = input;
      }}
      onSubmitEditing={() => {
        if (props.validateConfirmationPassword()) {
          props.onDone();
        } else {
          this.confPasswordInput.shake();
        }
      }}
    />
    <Button
      buttonStyle={styles.loginButton}
      title="SIGN UP"
      containerStyle={{ marginTop: 32, flex: 0 }}
      activeOpacity={0.8}
      titleStyle={styles.loginTextButton}
      loading={props.isLoading}
      loadingProps={{ size: 'large', color: 'white' }}
      onPress={() => props.onDone()}
      disabled={props.isLoading}
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
    </View>
  </View>
);

Register.propTypes = {
  onSelect: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  confirmationPassword: PropTypes.string,
  setConfirmPassword: PropTypes.func,
  emailValid: PropTypes.bool,
  passwordValid: PropTypes.bool,
  confirmationPasswordValid: PropTypes.bool,
  validateEmail: PropTypes.func,
  validatePassword: PropTypes.func,
  validateConfirmationPassword: PropTypes.func,
  isLoading: PropTypes.bool,
  onDone: PropTypes.func,
};

export default Register;
