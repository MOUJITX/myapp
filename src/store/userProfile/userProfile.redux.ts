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
  uuid: string
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
      state.loginHistory.push(action.payload);
    },
    userAddInfoAction: (state, action: PayloadAction<UserInfo>) => {
      if (!filterUserInfoByUUID(state.userInfos, action.payload.uuid)) {
        state.userInfos.push(action.payload);
      }
    },
  },
});

export const {
  userLoginAction,
  userLoginSuccessAction,
  userLoginFailureAction,
  userLogoutAction,
  userAddLoginHistoryAction,
  userAddInfoAction,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
