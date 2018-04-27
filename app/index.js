import React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';
// import Home from './screens/Home';
// import SignIn from './screens/SignIn';
// import Catalog from './screens/Catalog';
// import CoursePage from './screens/CoursePage';
// import Classroom from './screens/Classroom';

const { width } = Dimensions.get('window');

// https://www.sessions.edu/color-calculator-results/?colors=ff8100,0080ff,8000ff,80ff00

EStyleSheet.build({
  $positive: '#ff8100',
  $lightText: '#ffa700',
  $lightAccent: '#0080ff',
  $darkAccent: '#CD4440',
  $darkText: '#25232E',
  $lightContent: 'white',
  $rem: width > 340 ? 18 : 16,
});
export default () => <Navigator />;
