import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';

import { expireReminderEpics } from './expireReminder/expireReminder.epics';
import expireReminderRedux from './expireReminder/expireReminder.redux';
import { navigationEpics } from './navigation/navigation.epics';
import navigationRedux from './navigation/navigation.redux';
import ticketCardRedux from './ticketCard/ticketCard.redux';
import { RootState } from './type';
import { userProfileEpics } from './userProfile/userProfile.epics';
import userProfileRedux from './userProfile/userProfile.redux';

export const rootReducer = combineReducers({
  userProfile: userProfileRedux,
  navigation: navigationRedux,
  expireReminder: expireReminderRedux,
  ticketCard: ticketCardRedux,
});

export const rootEpic: any = combineEpics(
  userProfileEpics,
  navigationEpics,
  expireReminderEpics,
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware<RootState>();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
