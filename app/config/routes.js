import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../screens/Home';
import Catalog from '../screens/Catalog';
import CoursePage from '../screens/CoursePage';
import Classroom from '../screens/Classroom';
import SignIn from '../screens/SignIn';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ClassContent from '../screens/ClassContent';
import Profile from '../screens/Profile';

const TabStack = createBottomTabNavigator(
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
    animationEnabled: true,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else {
          iconName = `ios-cart${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} type="ionicon" />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#00204080',
      labelStyle: {
        // fontSize: 14,
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

const AppStack = createStackNavigator(
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

const AuthStack = createStackNavigator(
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

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
