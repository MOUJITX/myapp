import { createSelector } from 'reselect';
import { RootState } from '../type';
import { TrainQuickSelect } from './ticketCard.type';

export const selectTrainQuickSelectItemsWithLoginUser = (
  selectKey: keyof TrainQuickSelect
) =>
  createSelector(
    (state: RootState) => state.ticketCard.trainSelect[selectKey],
    (state: RootState) => state.userProfile.loginUser,
    (trainSelect, loginUser) =>
      trainSelect.filter(t => t.createUser === loginUser)
  );

export const selectTrainQuickSelectItems = (
  selectKey: keyof TrainQuickSelect
) =>
  createSelector(
    (state: RootState) => state.ticketCard.trainSelect[selectKey],
    trainSelect => trainSelect
  );

export const selectTrainTickets = createSelector(
  (state: RootState) => state.ticketCard.trainTickets,
  (state: RootState) => state.userProfile.loginUser,
  (trainTickets, loginUser) =>
    trainTickets.filter(t => t.createUser === loginUser)
);
