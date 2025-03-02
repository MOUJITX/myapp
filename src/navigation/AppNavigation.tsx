import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigationList } from './AppNavigationList';
import { WelcomeScreen } from '../screens/welcome/welcomeScreen';
import { LoginScreen } from '../screens/userProfile/loginScreen/loginScreen';
import { t } from 'i18next';
import BottomTabNavigation from './BottomTabNavigation';
import { BackupDataScreen } from '../screens/userProfile/backupDataScreen/backupDataScreen';
import { DeviceInfo } from '../screens/debug/deviceInfo';
import { StateData } from '../screens/debug/stateData';
import { PageB } from '../screens/debug/page2';
import { PageC } from '../screens/debug/page3';

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
          title: t('userProfile.login.title'),
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen name="PageB" component={PageB} />
      <RootStack.Screen
        name="PageC"
        component={PageC}
        initialParams={{ initMsg: 'init msg' }}
      />
      <RootStack.Screen
        name="BackupDataScreen"
        component={BackupDataScreen}
        options={{
          title: t('userProfile.backup.title'),
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen name="DeviceInfo" component={DeviceInfo} />
      <RootStack.Screen name="StateData" component={StateData} />
    </RootStack.Navigator>
  );
};
