import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpireReminderState, Good, GoodItem } from './expireReminder.type';

const initialState: ExpireReminderState = {
  goodsList: [],
};

export const expireReminderSlice = createSlice({
  name: 'expireReminder',
  initialState,
  reducers: {
    addGoodAction: (
      state,
      action: PayloadAction<{ good: Good; loginUser?: string }>
    ) => {
      const good = state.goodsList.find(
        g =>
          g.uniqueCode === action.payload.good.uniqueCode &&
          g.createUser === action.payload.loginUser
      );
      if (good) {
        good.items.push(...action.payload.good.items);
      } else {
        state.goodsList.push({
          ...action.payload.good,
          createUser: action.payload.loginUser,
        });
      }
    },
    removeGoodAction: (state, action: PayloadAction<string>) => {
      state.goodsList = state.goodsList.filter(
        good => good.goodID !== action.payload
      );
    },
    removeGoodItemAction: (
      state,
      action: PayloadAction<{ goodID: string; itemID: string }>
    ) => {
      const good = state.goodsList.find(
        g => g.goodID === action.payload.goodID
      );
      if (good) {
        good.items = good.items.filter(
          item => item.itemID !== action.payload.itemID
        );
      }
    },
    updateGoodAction: (state, action: PayloadAction<Good>) => {
      const index = state.goodsList.findIndex(
        good => good.goodID === action.payload.goodID
      );
      if (index !== -1) {
        state.goodsList[index] = action.payload;
      }
    },
    updateGoodItemAction: (
      state,
      action: PayloadAction<{ goodID: string; item: GoodItem }>
    ) => {
      const good = state.goodsList.find(
        g => g.goodID === action.payload.goodID
      );
      if (good) {
        const index = good.items.findIndex(
          item => item.itemID === action.payload.item.itemID
        );
        if (index !== -1) {
          good.items[index] = action.payload.item;
        }
      }
    },
    clearAllGoodsAction: state => {
      state.goodsList = [];
    },
    clearGoodAllItemsAction: (state, action: PayloadAction<string>) => {
      const good = state.goodsList.find(g => g.goodID === action.payload);
      if (good) {
        good.items = [];
      }
    },
  },
});

export const {
  addGoodAction,
  removeGoodAction,
  updateGoodAction,
  removeGoodItemAction,
  updateGoodItemAction,
  clearAllGoodsAction,
  clearGoodAllItemsAction,
} = expireReminderSlice.actions;

export default expireReminderSlice.reducer;
