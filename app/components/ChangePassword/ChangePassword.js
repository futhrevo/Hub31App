import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, LayoutAnimation, UIManager } from 'react-native';
import { Button } from 'react-native-elements';

import { Container } from '../Container';
import { FormInput } from '../Login';

import styles from './styles';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      password: '',
      newPassword: '',
      confirmationPassword: '',
      passwordValid: true,
      newPasswordValid: true,
      confirmationPasswordValid: true,
    };
    this.validatePassword = this.validatePassword.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 6;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    return passwordValid;
  }

  validateNewPassword() {
    const { newPassword } = this.state;
    const newPasswordValid = newPassword.length >= 6;
    LayoutAnimation.easeInEaseOut();
    this.setState({ newPasswordValid });
    return newPasswordValid;
  }

  validateConfirmationPassword() {
    const { newPassword, confirmationPassword } = this.state;
    const confirmationPasswordValid = newPassword === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    return confirmationPasswordValid;
  }

  changePassword() {
    LayoutAnimation.easeInEaseOut();
    const passwordValid = this.validatePassword();
    const newPasswordValid = this.validateNewPassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();

    if (passwordValid && newPasswordValid && confirmationPasswordValid) {
      this.setState({ isLoading: true });
    }
  }
  render() {
    const {
      isLoading,
      password,
      newPassword,
      confirmationPassword,
      passwordValid,
      newPasswordValid,
      confirmationPasswordValid,
    } = this.state;
    return (
      <Container safe>
        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
          <ScrollView contentContainerStyle={styles.container}>
            <FormInput
              icon="lock"
              placeholder="Current Password"
              secureTextEntry
              dark
              editable={!isLoading}
              value={password}
              errorMessage={passwordValid ? null : 'Please enter at least 8 characters'}
              onChangeText={(pass) => {
                this.setState({ password: pass });
              }}
              refInput={(input) => {
                this.passwordInput = input;
              }}
              onSubmitEditing={() => {
                if (this.validatePassword()) {
                  this.newInput.focus();
                } else {
                  this.passwordInput.shake();
                }
              }}
            />
            <FormInput
              icon="key"
              placeholder="New Password"
              secureTextEntry
              dark
              editable={!isLoading}
              value={newPassword}
              errorMessage={newPasswordValid ? null : 'Please enter at least 8 characters'}
              onChangeText={(pass) => {
                this.setState({ newPassword: pass });
              }}
              refInput={(input) => {
                this.newInput = input;
              }}
              onSubmitEditing={() => {
                if (this.validateNewPassword()) {
                  this.confirmInput.focus();
                } else {
                  this.newInput.shake();
                }
              }}
            />
            <FormInput
              icon="key"
              placeholder="Confirm New Password"
              secureTextEntry
              dark
              editable={!isLoading}
              value={confirmationPassword}
              errorMessage={confirmationPasswordValid ? null : 'Passwords do not match'}
              onChangeText={(pass) => {
                this.setState({ confirmationPassword: pass });
              }}
              refInput={(input) => {
                this.confirmInput = input;
              }}
              onSubmitEditing={() => {
                if (!this.validateConfirmationPassword()) {
                  this.confirmInput.shake();
                }
              }}
            />
            <Button
              title="CHANGE PASSWORD"
              containerStyle={{ marginTop: 32, flex: 0 }}
              activeOpacity={0.8}
              buttonStyle={styles.loginButton}
              loading={isLoading}
              loadingProps={{ size: 'large', color: 'white' }}
              disabled={isLoading}
              onPress={() => this.changePassword()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default ChangePassword;
