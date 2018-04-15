import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import styles from './styles';
import FormInput from './FormInput';

const Login = (props) => (
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
          props.onDone();
        } else {
          this.passwordInput.shake();
        }
      }}
    />
    <Button
      buttonStyle={styles.loginButton}
      title="SIGN IN"
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
        title="Forgot Password?"
        containerStyle={{ marginTop: 32, flex: 0 }}
        activeOpacity={0.8}
        titleStyle={styles.loginHelpButtons}
        onPress={() => props.onSelect(1)}
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

Login.propTypes = {
  onSelect: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  emailValid: PropTypes.bool,
  passwordValid: PropTypes.bool,
  validateEmail: PropTypes.func,
  validatePassword: PropTypes.func,
  isLoading: PropTypes.bool,
  onDone: PropTypes.func,
};

export default Login;
