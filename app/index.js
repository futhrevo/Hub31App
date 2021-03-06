import React, { useEffect } from 'react';
import { Dimensions, YellowBox } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Meteor from 'meteorjs-client';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { useScreens } from 'react-native-screens';

import settings from './config/settings';
import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './redux/store';
// import Home from './screens/Home';
// import SignIn from './screens/SignIn';
// import Catalog from './screens/Catalog';
// import CoursePage from './screens/CoursePage';
// import Classroom from './screens/Classroom';
// import Profile from './screens/Profile';

const { width } = Dimensions.get('window');

useScreens();
Orientation.lockToPortrait();

// TODO: remove this warning workaround refer https://github.com/facebook/react-native/issues/18868
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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

const App = () => {
  useEffect(() => {
    // old https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae
    // https://medium.com/@appstud/add-a-splash-screen-to-a-react-native-app-810492e773f9
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider>
        <Navigator />
      </AlertProvider>
    </Provider>
  );
};

export default App;
