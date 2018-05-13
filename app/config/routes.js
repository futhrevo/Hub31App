import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Catalog from '../screens/Catalog';
import CoursePage from '../screens/CoursePage';
import Classroom from '../screens/Classroom';
import SignIn from '../screens/SignIn';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ClassContent from '../screens/ClassContent';
import Profile from '../screens/Profile';

const TabStack = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },
    Catalog: {
      screen: Catalog,
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#00204080',
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      style: {
        backgroundColor: '#0080ff',
      },
      indicatorStyle: {
        backgroundColor: '#ff8100',
      },
    },
  },
);

const AppStack = StackNavigator(
  {
    MyTab: {
      screen: TabStack,
      navigationOptions: { title: 'HUB 31' },
    },
    CoursePage: {
      screen: CoursePage,
    },
    Classroom: {
      screen: Classroom,
      navigationOptions: { title: 'Outline' },
    },
    ClassContent: {
      screen: ClassContent,
    },
  },
  {
    initialRouteName: 'MyTab',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff8100',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AuthStack = StackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
  },
  {
    navigationOptions: {
      header: () => null,
    },
  },
);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
