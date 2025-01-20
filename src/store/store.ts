import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userProfileRedux } from './userProfile/userProfile.redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { RootState } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { userProfileEpics } from './userProfile/userProfile.epics';

export const rootReducer = combineReducers({
  userProfile: userProfileRedux.reducer,
});

export const rootEpic: any = combineEpics(userProfileEpics);

const persistConfig: PersistConfig<RootState> = {
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
