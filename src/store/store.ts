import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { RootState } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { userProfileEpics } from './userProfile/userProfile.epics';
import userProfileRedux from './userProfile/userProfile.redux';
import navigationRedux from './navigation/navigation.redux';
import { navigationEpics } from './navigation/navigation.epics';
import expireReminderRedux from './expireReminder/expireReminder.redux';
import { expireReminderEpics } from './expireReminder/expireReminder.epics';
// import { expireReminderEpics } from './expireReminder/expireReminder.epics';

export const rootReducer = combineReducers({
  userProfile: userProfileRedux,
  navigation: navigationRedux,
  expireReminder: expireReminderRedux,
});

export const rootEpic: any = combineEpics(
  userProfileEpics,
  navigationEpics,
  expireReminderEpics
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
