import React from 'react';
import { StatusBar, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Logo } from '../components/Logo';
import { Login, Pwdreset, Register } from '../components/Login';

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
    width: '100%',
    alignItems: 'center',
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView
        scrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <StatusBar translucent={false} barStyle="dark-content" />

        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
          <Logo />
          <Register />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SignIn;
