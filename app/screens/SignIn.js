import React from 'react';
import {
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import Meteor, { createContainer, Accounts } from 'react-native-meteor';

import { Logo } from '../components/Logo';
import { Login, Pwdreset, Register } from '../components/Login';
import { connectAlert } from '../components/Alert';

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '$positive',
  },
  formContainer: {
    flex: 1,
  },
});

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedType: 0,
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      confirmationPasswordValid: true,
    };
    this.setSelectedType = this.setSelectedType.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
  }

  componentDidUpdate() {
    const { connStatus, isLoggingIn, userId } = this.props;
    if (connStatus.connected && !isLoggingIn) {
      if (userId !== null) {
        return this.props.navigation.navigate('App');
      }
    }
    return true;
  }

  setSelectedType(selectedType) {
    // LayoutAnimation.easeInEaseOut();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({ selectedType });
  }

  setEmail(email) {
    this.setState({ email });
  }

  setPassword(password) {
    this.setState({ password });
  }

  setConfirmPassword(confirmationPassword) {
    this.setState({ confirmationPassword });
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 6;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    return confirmationPasswordValid;
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    if (emailValid && passwordValid && confirmationPasswordValid) {
      this.setState({ isLoading: true });
      const { email, password } = this.state;
      return Accounts.createUser({ email, password }, (err) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        if (err) {
          this.props.alertWithType('error', 'Error', err.reason);
        } else {
          this.props.navigation.navigate('App');
        }
      });
    }
    return false;
  }

  signin() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    if (emailValid && passwordValid) {
      this.setState({ isLoading: true });
      const { email, password } = this.state;
      return Meteor.loginWithPassword(email, password, (err) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        if (err) {
          this.props.alertWithType('error', 'Error', err.reason);
        } else {
          this.props.navigation.navigate('App');
        }
      });
    }
    return false;
  }

  recoverPassword() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    if (emailValid) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        Alert.alert('🎸', 'You rock recover password');
      }, 1500);
    }
  }

  renderSelected() {
    const { selectedType } = this.state;
    switch (selectedType) {
      case 0:
        return (
          <Login
            onSelect={this.setSelectedType}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            validateEmail={this.validateEmail}
            validatePassword={this.validatePassword}
            onDone={this.signin}
            {...this.state}
          />
        );
      case 1:
        return (
          <Pwdreset
            onSelect={this.setSelectedType}
            setEmail={this.setEmail}
            validateEmail={this.validateEmail}
            onDone={this.recoverPassword}
            {...this.state}
          />
        );
      case 2:
        return (
          <Register
            onSelect={this.setSelectedType}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            setConfirmPassword={this.setConfirmPassword}
            validateEmail={this.validateEmail}
            validatePassword={this.validatePassword}
            validateConfirmationPassword={this.validateConfirmationPassword}
            onDone={this.signup}
            {...this.state}
          />
        );
      default:
        return (
          <Login
            onSelect={this.setSelectedType}
            setEmail={this.setEmail}
            setPassword={this.setPassword}
            validateEmail={this.validateEmail}
            validatePassword={this.validatePassword}
            onDone={this.signin}
            {...this.state}
          />
        );
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.formContainer}>
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />
          <Logo />
          {this.renderSelected()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

SignIn.propTypes = {
  navigation: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  connStatus: PropTypes.object,
  userId: PropTypes.string,
  alertWithType: PropTypes.func,
};

export default createContainer(() => {
  const connStatus = Meteor.status();
  const isLoggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();

  return {
    connStatus,
    isLoggingIn,
    userId,
  };
}, connectAlert(SignIn));
