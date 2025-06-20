import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from 'i18next';
import { Text } from 'react-native';

import { ExpireReminderListScreen } from '../screens/expireReminder/reminderListScreen/reminderListScreen';
import { TicketCardScreen } from '../screens/ticketCard/ticketCardScreen/ticketCardScreen';
import profileScreen from '../screens/userProfile/profileScreen/profileScreen';
import { commonStyles } from '../styles';

import { AppNavigationList } from './AppNavigationList';

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
        animation: 'shift',
      }}>
      <BottomTab.Screen
        name="ExpireReminderScreen"
        component={ExpireReminderListScreen}
        options={{
          title: t('expireReminder.title'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }: { color: string }) =>
            tabBarIcon({ color, icon: '📅' }),
        }}
      />
      <BottomTab.Screen
        name="TicketCardScreen"
        component={TicketCardScreen}
        options={{
          title: t('trainTicket.title'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }: { color: string }) =>
            tabBarIcon({ color, icon: '💳' }),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={profileScreen}
        options={{
          title: t('userProfile.title'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }: { color: string }) =>
            tabBarIcon({ color, icon: '👤' }),
        }}
      />
    </BottomTab.Navigator>
  );
};
