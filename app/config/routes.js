import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Profile') {
          iconName = 'ios-contact';
        } else {
          iconName = 'ios-cart';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon name={iconName} size={25} color={tintColor} type="ionicon" />
        );
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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ff8100',
        ...Platform.select({
          ios: {},
          android: {
            paddingTop: StatusBar.currentHeight,
            height: StatusBar.currentHeight + 56,
          },
        }),
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
    defaultNavigationOptions: {
      header: () => null,
    },
  },
);

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(MainNavigator);
