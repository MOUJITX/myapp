import { RootState } from '../type';

export const selectAllExpireReminder = (state: RootState) =>
  state.expireReminder.goodsList;
