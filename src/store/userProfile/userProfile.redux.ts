import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfo, UserProfileState} from './userProfile.type';

const initialState: UserProfileState = {
  isLogin: false,
  loginUser: undefined,
  userInfo: [],
};

const filterUserInfo = (
  userList: UserInfo[],
  uuid: string,
): UserInfo | undefined => userList.find(userInfo => userInfo.uuid === uuid);

export const userProfileRedux = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    userLogin: (state, _action: PayloadAction<UserInfo>) => {
      return state;
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
      if (!filterUserInfo(state.userInfo, action.payload.uuid)) {
        state.userInfo.push(action.payload);
      }
    },
  },
});

export const {userLogin, userLoginSuccess, userLoginFailure, userAddInfo} =
  userProfileRedux.actions;

export default userProfileRedux.reducer;
