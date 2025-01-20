import { RootState } from '../type';

export const selectIsUserLogin = (state: RootState) =>
  state.userProfile.isLogin;

export const selectLoginUser = (state: RootState) =>
  state.userProfile.loginUser;

export const selectAll = (state: RootState) => state;

export const selectUserInfoByUUID = (state: RootState, uuid: string) =>
  state.userProfile.userInfos.find(userInfo => userInfo.uuid === uuid);

export const selectUserInfoByUsername = (state: RootState, username: string) =>
  state.userProfile.userInfos.find(userInfo => userInfo.username === username);
