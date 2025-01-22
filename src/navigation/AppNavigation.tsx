import React from 'react';
import { PageA } from '../screens/page1/page1Screen';
import { PageB } from '../page2';
import { PageC } from '../page3';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigationList } from './AppNavigationList';
import { WelcomeScreen } from '../screens/welcome/welcomeScreen';
import { LoginScreen } from '../screens/userProfile/loginScreen/loginScreen';
import { t } from 'i18next';
import { DebugScreen } from '../screens/debug/debugScreen';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './AppNavigationRef';

export const AppNavigation = () => {
  const RootStack = createNativeStackNavigator<AppNavigationList>();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName="WelcomeScreen">
        <RootStack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: t('userProfile.login.title') }}
        />
        <RootStack.Screen name="PageA" component={PageA} />
        <RootStack.Screen name="PageB" component={PageB} />
        <RootStack.Screen
          name="PageC"
          component={PageC}
          initialParams={{ initMsg: 'init msg' }}
        />
        <RootStack.Screen name="DebugScreen" component={DebugScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
