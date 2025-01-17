import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload, UserInfo, UserProfileState } from './userProfile.type';

const initialState: UserProfileState = {
  isLogin: false,
  loginUser: undefined,
  userInfo: [],
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

export const userProfileRedux = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    userLogin: (_state, _action: PayloadAction<LoginPayload>) => {
      return;
    },
    userLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.loginUser = action.payload;
    },
    userLoginFailure: state => {
      state.isLogin = false;
      state.loginUser = undefined;
    },
    userAddInfo: (state, action: PayloadAction<UserInfo>) => {
      if (!filterUserInfoByUUID(state.userInfo, action.payload.uuid)) {
        state.userInfo.push(action.payload);
      }
    },
  },
});

export const { userLogin, userLoginSuccess, userLoginFailure, userAddInfo } =
  userProfileRedux.actions;
