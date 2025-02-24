import React from 'react';
import { PageB } from '../page2';
import { PageC } from '../page3';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigationList } from './AppNavigationList';
import { WelcomeScreen } from '../screens/welcome/welcomeScreen';
import { LoginScreen } from '../screens/userProfile/loginScreen/loginScreen';
import { t } from 'i18next';
import { DebugScreen } from '../screens/debug/debugScreen';
import { navigationRef } from './AppNavigationRef';
import { TouchableOpacity, Text } from 'react-native';
import BottomTabNavigation from './BottomTabNavigation';
import { BackupDataScreen } from '../screens/userProfile/backupDataScreen/backupDataScreen';

const debugButton = () => (
  <TouchableOpacity
    onPress={() => navigationRef.current?.navigate('DebugScreen')}
  >
    <Text>Debug</Text>
  </TouchableOpacity>
);

export const commonHeaderOptions = {
  headerRight: __DEV__ ? debugButton : undefined,
};

export const AppNavigation = () => {
  const RootStack = createNativeStackNavigator<AppNavigationList>();

  return (
    <RootStack.Navigator initialRouteName="WelcomeScreen">
      <RootStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          ...commonHeaderOptions,
          title: t('userProfile.login.title'),
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{
          ...commonHeaderOptions,
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="PageB"
        component={PageB}
        options={commonHeaderOptions}
      />
      <RootStack.Screen
        name="PageC"
        component={PageC}
        initialParams={{ initMsg: 'init msg' }}
      />
      <RootStack.Screen
        name="BackupDataScreen"
        component={BackupDataScreen}
        options={{
          ...commonHeaderOptions,
          title: t('userProfile.backup.title'),
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen name="DebugScreen" component={DebugScreen} />
    </RootStack.Navigator>
  );
};
