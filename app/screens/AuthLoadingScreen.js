import React from 'react';
import {
  ActivityIndicator, StatusBar, View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Meteor, { withTracker } from 'meteorjs-client';

class AuthLoadingScreen extends React.Component {
  componentDidUpdate() {
    const { connStatus, isLoggingIn, userId } = this.props;
    if (connStatus.connected && !isLoggingIn) {
      if (userId === null) {
        return this.props.navigation.navigate('Auth');
      }
      return this.props.navigation.navigate('App');
    }
    return true;
  }

  render() {
    const { isLoggingIn } = this.props;
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
        {isLoggingIn ? <Text style={{ margin: 10, color: 'white' }}>Trying to Log In</Text> : null}
        <StatusBar barStyle="light-content" backgroundColor="#ff8100" />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  connStatus: PropTypes.object,
  userId: PropTypes.string,
};

export default withTracker(() => {
  const connStatus = Meteor.status();
  const isLoggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();

  return {
    connStatus,
    isLoggingIn,
    userId,
  };
})(AuthLoadingScreen);
