import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload, UserInfo, UserProfileState } from './userProfile.type';

const initialState: UserProfileState = {
  isLogin: false,
  loginUser: undefined,
  userInfos: [],
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
    userLoginAction: (_state, _action: PayloadAction<LoginPayload>) => {},
    userLoginSuccessAction: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.loginUser = action.payload;
    },
    userLoginFailureAction: state => {
      state.isLogin = false;
      state.loginUser = undefined;
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
  userAddInfoAction,
} = userProfileRedux.actions;
