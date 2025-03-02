import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppNavigationList } from './AppNavigationList';
import { commonStyles } from '../styles';
import { ExpireReminderListScreen } from '../screens/expireReminder/reminderListScreen/reminderListScreen';
import { t } from 'i18next';
import { Text } from 'react-native';
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
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '📅' }),
        }}
      />
      <BottomTab.Screen
        name="TicketCardScreen"
        component={TicketCardScreen}
        options={{
          title: t('trainTicket.title'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '💳' }),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={profileScreen}
        options={{
          title: t('userProfile.title'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => tabBarIcon({ color, icon: '👤' }),
        }}
      />
    </BottomTab.Navigator>
  );
};
