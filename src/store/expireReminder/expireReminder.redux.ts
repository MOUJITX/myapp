import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ExpireReminderState,
  Good,
  GoodCategory,
  GoodItem,
} from './expireReminder.type';
import { randomUUID } from '../../utils/utils';
import { t } from 'i18next';

const initialState: ExpireReminderState = {
  goodsList: [],
  categoriesList: [],
};

export const expireReminderSlice = createSlice({
  name: 'expireReminder',
  initialState,
  reducers: {
    addGoodAction: (
      state,
      action: PayloadAction<{ good: Good; loginUser?: string }>
    ) => {
      const goodIndex = state.goodsList.findIndex(
        g => g.goodID === action.payload.good.goodID
      );

      if (goodIndex !== -1) {
        state.goodsList[goodIndex] = {
          ...action.payload.good,
          createUser: action.payload.loginUser,
        };
      } else {
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
    initCategoryAction: (state, action: PayloadAction<string>) => {
      const categoriesList: GoodCategory[] = [
        {
          categoryID: 'all',
          label: t('expireReminder.category.label.all'),
          createUser: action.payload,
          isDefault: true,
        },
        {
          categoryID: 'medicine',
          label: t('expireReminder.category.label.medicine'),
          createUser: action.payload,
          isDefault: false,
        },
        {
          categoryID: 'food',
          label: t('expireReminder.category.label.food'),
          createUser: action.payload,
          isDefault: false,
        },
        {
          categoryID: 'default',
          label: t('expireReminder.category.label.default'),
          createUser: action.payload,
          isDefault: false,
        },
      ];
      state.categoriesList.push(...categoriesList);
    },
    addCategoryAction: (
      state,
      action: PayloadAction<{
        label: string;
        createUser: string;
      }>
    ) => {
      state.categoriesList.push({
        ...action.payload,
        categoryID: randomUUID(),
        isDefault: false,
      });
    },
    updateCategoryAction: (
      state,
      action: PayloadAction<{
        categoryID: string;
        newLabel: string;
      }>
    ) => {
      const index = state.categoriesList.findIndex(
        category => category.categoryID === action.payload.categoryID
      );
      if (index !== -1) {
        state.categoriesList[index] = {
          ...state.categoriesList[index],
          label: action.payload.newLabel,
        };
      }
    },
    removeCategoryAction: (state, action: PayloadAction<string>) => {
      state.categoriesList = state.categoriesList.filter(
        cat => cat.categoryID !== action.payload
      );
    },
    restoreExpireReminderAction: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.goodsList = action.payload.goodsList;
        state.categoriesList = action.payload.categoriesList;
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
  initCategoryAction,
  addCategoryAction,
  updateCategoryAction,
  removeCategoryAction,
  restoreExpireReminderAction,
} = expireReminderSlice.actions;

export default expireReminderSlice.reducer;
