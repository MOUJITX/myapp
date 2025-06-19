import { ExpireReminderState } from './expireReminder/expireReminder.type';
import { TicketCardState } from './ticketCard/ticketCard.type';
import { UserProfileState } from './userProfile/userProfile.type';

export interface RootState {
  userProfile: UserProfileState;
  expireReminder: ExpireReminderState;
  ticketCard: TicketCardState;
}
