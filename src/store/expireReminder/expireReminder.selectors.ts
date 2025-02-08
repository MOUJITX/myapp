import { createSelector } from 'reselect';
import { RootState } from '../type';

export const selectAllExpireReminder = createSelector(
  (state: RootState) => state.expireReminder.goodsList,
  (state: RootState) => state.userProfile.loginUser,
  (goodsList, loginUser) => goodsList.filter(g => g.createUser === loginUser)
);
