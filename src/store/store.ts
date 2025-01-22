import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { RootState } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { userProfileEpics } from './userProfile/userProfile.epics';
import userProfileRedux from './userProfile/userProfile.redux';
import navigationRedux from './navigation/navigation.redux';
import { navigationEpics } from './navigation/navigation.epics';

export const rootReducer = combineReducers({
  userProfile: userProfileRedux,
  navigation: navigationRedux,
});

export const rootEpic: any = combineEpics(userProfileEpics, navigationEpics);

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
