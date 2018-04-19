import React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// import Home from './screens/Home';
// import SignIn from './screens/SignIn';
// import Catalog from './screens/Catalog';
import CoursePage from './screens/CoursePage';

const { width } = Dimensions.get('window');

EStyleSheet.build({
  $positive: '#ff8100',
  $lightText: '#ffa700',
  $lightAccent: '#8BB3BC',
  $darkAccent: '#CD4440',
  $darkText: '#25232E',
  $lightContent: 'white',
  $rem: width > 340 ? 18 : 16,
});
export default () => <CoursePage />;
