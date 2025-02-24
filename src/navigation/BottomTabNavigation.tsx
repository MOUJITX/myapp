import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppNavigationList } from './AppNavigationList';
import { commonStyles } from '../styles';
import { ExpireReminderListScreen } from '../screens/expireReminder/reminderListScreen/reminderListScreen';
import { t } from 'i18next';
import { Text } from 'react-native';
import { commonHeaderOptions } from './AppNavigation';
import profileScreen from '../screens/userProfile/profileScreen/profileScreen';
import { TicketCardScreen } from '../screens/ticketCard/ticketCardScreen/ticketCardScreen';

export default () => {
  const BottomTab = createBottomTabNavigator<AppNavigationList>();

  const tabBarIcon = ({ color, icon }: { color: string; icon: string }) => (
    <Text style={{ color }}>{icon}</Text>
  );

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: commonStyles.statusColor.primary,
        tabBarStyle: {
          paddingBottom: 4,
          height: 60,
        },
      }}
    >
      <BottomTab.Screen
        name="ExpireReminderScreen"
        component={ExpireReminderListScreen}
        options={{
          title: t('expireReminder.title'),
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '📅' }),
          ...commonHeaderOptions,
        }}
      />
      <BottomTab.Screen
        name="TicketCardScreen"
        component={TicketCardScreen}
        options={{
          // title: t('expireReminder.title'),
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '💳' }),
          ...commonHeaderOptions,
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={profileScreen}
        options={{
          title: t('userProfile.title'),
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '👤' }),
        }}
      />
    </BottomTab.Navigator>
  );
};
