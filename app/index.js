import React, { Component } from 'react';
import { Dimensions, YellowBox } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor from 'react-native-meteor';
import Orientation from 'react-native-orientation';
import OneSignal from 'react-native-onesignal';

import settings from './config/settings';
import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
// import Home from './screens/Home';
// import SignIn from './screens/SignIn';
// import Catalog from './screens/Catalog';
// import CoursePage from './screens/CoursePage';
// import Classroom from './screens/Classroom';
// import Profile from './screens/Profile';

const { width } = Dimensions.get('window');

Orientation.lockToPortrait();

// TODO: remove this warning workaround refer https://github.com/facebook/react-native/issues/18868
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// https://www.sessions.edu/color-calculator-results/?colors=ff8100,0080ff,8000ff,80ff00

Meteor.connect(settings.SERVER_URL);

EStyleSheet.build({
  $positive: '#ff8100',
  $lightText: '#ffa700',
  $lightAccent: '#0080ff',
  $darkAccent: '#CD4440',
  $darkText: '#25232E',
  $tetra1: '#8000ff',
  $tetra2: '#80ff00',
  $lightContent: 'white',
  $rem: width > 340 ? 18 : 16,
});

export default class App extends Component {
  componentWillMount() {
    OneSignal.init('27768c3a-9946-4799-ac52-d98d716f1e00');
  }
  render() {
    return (
      <AlertProvider>
        <Navigator />
      </AlertProvider>
    );
  }
}
