import { UserProfileState } from './userProfile/userProfile.type';
import { ExpireReminderState } from './expireReminder/expireReminder.type';

export interface RootState {
  userProfile: UserProfileState;
  expireReminder: ExpireReminderState;
}
