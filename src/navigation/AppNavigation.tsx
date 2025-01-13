import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { PageA } from '../screens/page1/page1Screen';
import { PageB } from '../page2';
import { PageC } from '../page3';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigationList } from './AppNavigationList';
import { WelcomeScreen } from '../screens/welcome/welcomeScreen';
import { LoginScreen } from '../screens/userProfile/loginScreen/loginScreen';
import { useTranslation } from 'react-i18next';

export const AppNavigation = () => {
  const { t } = useTranslation();

  const RootStack = createNativeStackNavigator<AppNavigationList>({
    initialRouteName: 'WelcomeScreen',
    screens: {
      WelcomeScreen: {
        screen: WelcomeScreen,
        options: {
          headerShown: false,
        },
      },
      LoginScreen: {
        screen: LoginScreen,
        options: {
          title: t('userProfile.login.title'),
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
        initialParams: { initMsg: 'init msg' },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
};
