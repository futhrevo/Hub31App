import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

// import Home from './screens/Home';
// import SignIn from './screens/SignIn';
import Catalog from './screens/Catalog';

EStyleSheet.build({
  $positive: '#ff8100',
  $lightText: '#ffa700',
  $lightAccent: '#8BB3BC',
  $darkAccent: '#CD4440',
  $darkText: '#25232E',
  $lightContent: 'white',
});
export default () => <Catalog />;
