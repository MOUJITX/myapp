import { StackScreenProps } from '@react-navigation/stack';

import { ReminderAddScreenProps } from '../screens/expireReminder/reminderAddScreen/reminderAddScreen';
import { TicketCardAddScreenProps } from '../screens/ticketCard/ticketCardAddScreen/ticketCardAddScreen';

export type AppNavigationList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  PageB: undefined;
  PageC: {
    initMsg: String;
  };
  DeviceInfo: undefined;
  StateData: undefined;

  BottomTab: undefined;
  ExpireReminderScreen: undefined;
  ExpireReminderAddScreen: ReminderAddScreenProps;

  TicketCardScreen: undefined;
  TicketCardAddScreen: TicketCardAddScreenProps;

  AssetListScreen: undefined;
  ProfileScreen: undefined;
  BackupDataScreen: undefined;
};

export type RouteProp<SCREEN extends keyof AppNavigationList> =
  StackScreenProps<AppNavigationList, SCREEN>;
