import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userProfileRedux } from './userProfile/userProfile.redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { RootState } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rootReducer = combineReducers({
  userProfile: userProfileRedux.reducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
