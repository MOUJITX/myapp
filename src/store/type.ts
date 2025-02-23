import { UserProfileState } from './userProfile/userProfile.type';
import { ExpireReminderState } from './expireReminder/expireReminder.type';
import { TicketCardState } from './ticketCard/ticketCard.type';

export interface RootState {
  userProfile: UserProfileState;
  expireReminder: ExpireReminderState;
  ticketCard: TicketCardState;
}
