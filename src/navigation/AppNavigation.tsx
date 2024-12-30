import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {PageA} from '../page1';
import {PageB} from '../page2';
import {PageC} from '../page3';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppNavigationList} from './AppNavigationList';
import {WelcomeScreen} from '../WelcomeScreen';

export const AppNavigation = () => {
  const RootStack = createNativeStackNavigator<AppNavigationList>({
    initialRouteName: 'WelcomeScreen',
    screens: {
      WelcomeScreen: {
        screen: WelcomeScreen,
        options: {
          headerShown: false,
        },
      },
      PageA: {
        screen: PageA,
        options: {
          headerShown: false,
        },
      },
      PageB: PageB,
      PageC: {
        screen: PageC,
        initialParams: {initMsg: 'init msg'},
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
};
