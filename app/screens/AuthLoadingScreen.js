import React from 'react';
import { ActivityIndicator, StatusBar, AsyncStorage, View } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from '../components/Container';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._verifyAuthAsync();
  }

  _verifyAuthAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ff8100',
        }}
      >
        <ActivityIndicator size="large" color="white" />
        <StatusBar barStyle="light-content" backgroundColor="#ff8100" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object,
};
export default AuthLoadingScreen;
