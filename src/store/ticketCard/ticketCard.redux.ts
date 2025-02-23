import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SelectItemWithUser,
  TicketCardState,
  TrainQuickSelect,
  TrainTicket,
} from './ticketCard.type';

const initialState: TicketCardState = {
  trainTickets: [],
  trainSelect: {
    stations: [],
    checks: [],
    // seatTypes: [],
    // seatCars: [],
    // seatNumbers: [],
    passengers: [],
    // cardInfos: [],
    // cardTips: [],
  },
};

export const ticketCardSlice = createSlice({
  name: 'ticketCard',
  initialState,
  reducers: {
    trainSelectAddAction: (
      state,
      action: PayloadAction<{
        key: keyof TrainQuickSelect;
        item: SelectItemWithUser;
      }>
    ) => {
      state.trainSelect[action.payload.key].push({
        ...action.payload.item,
        createTime: new Date(),
      });
    },
    trainSelectRemoveAction: (
      state,
      action: PayloadAction<{ key: keyof TrainQuickSelect; value: string }>
    ) => {
      state.trainSelect[action.payload.key] = state.trainSelect[
        action.payload.key
      ].filter(item => item.value !== action.payload.value);
    },
    trainSelectUpdateAction: (
      state,
      action: PayloadAction<{
        key: keyof TrainQuickSelect;
        item: SelectItemWithUser;
      }>
    ) => {
      state.trainSelect[action.payload.key] = state.trainSelect[
        action.payload.key
      ].map(item => {
        if (item.value === action.payload.item.value) {
          return {
            ...action.payload.item,
          };
        }
        return item;
      });
    },
    trainTicketsAddAction: (state, action: PayloadAction<TrainTicket>) => {
      state.trainTickets.push(action.payload);
    },
    trainTicketsRemoveAction: (state, action: PayloadAction<string>) => {
      state.trainTickets = state.trainTickets.filter(
        item => item.uuid !== action.payload
      );
    },
    trainTicketsUpdateAction: (state, action: PayloadAction<TrainTicket>) => {
      state.trainTickets = state.trainTickets.map(item => {
        if (item.uuid === action.payload.uuid) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
    },
  },
});

export const {
  trainSelectAddAction,
  trainSelectRemoveAction,
  trainSelectUpdateAction,
  trainTicketsAddAction,
  trainTicketsRemoveAction,
  trainTicketsUpdateAction,
} = ticketCardSlice.actions;

export default ticketCardSlice.reducer;
