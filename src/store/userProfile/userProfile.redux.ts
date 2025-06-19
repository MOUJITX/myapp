import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LoginHistory,
  LoginPayload,
  UserInfo,
  UserProfileState,
} from './userProfile.type';

const initialState: UserProfileState = {
  isLogin: false,
  loginUser: undefined,
  userInfos: [],
  loginHistory: [],
};

const filterUserInfoByUUID = (
  userList: UserInfo[],
  uuid: string,
): UserInfo | undefined => userList.find(userInfo => userInfo.uuid === uuid);

// const filterUserInfoByUsername = (
//   userList: UserInfo[],
//   username: string
// ): UserInfo | undefined =>
//   userList.find(userInfo => userInfo.username === username);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    userLoginAction: (_state, _action: PayloadAction<LoginPayload>) => {},
    userLoginSuccessAction: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.loginUser = action.payload;
    },
    userLoginFailureAction: (state, _action: PayloadAction<string>) => {
      state.isLogin = false;
      state.loginUser = undefined;
    },
    userLogoutAction: (state, _action: PayloadAction<string>) => {
      state.isLogin = false;
      state.loginUser = undefined;
    },
    userAddLoginHistoryAction: (state, action: PayloadAction<LoginHistory>) => {
      // console.log('push', action.payload);
      action.payload.uuid && state.loginHistory.push(action.payload);
    },
    userAddInfoAction: (state, action: PayloadAction<UserInfo>) => {
      if (!filterUserInfoByUUID(state.userInfos, action.payload.uuid)) {
        state.userInfos.push(action.payload);
      }
    },
    userRestoreInfoAction: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.isLogin = false;
        state.loginUser = undefined;
        state.userInfos = action.payload.userInfos;
        state.loginHistory = action.payload.loginHistory;
      }
    },
    restoreAction: (_state, _action: PayloadAction<string>) => {},
  },
});

export const {
  userLoginAction,
  userLoginSuccessAction,
  userLoginFailureAction,
  userLogoutAction,
  userAddLoginHistoryAction,
  userAddInfoAction,
  userRestoreInfoAction,
  restoreAction,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
