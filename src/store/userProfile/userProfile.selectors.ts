import { RootState } from '../type';

export const selectIsUserLogin = (state: RootState) =>
  state.userProfile.isLogin;

export const selectLoginUserUUID = (state: RootState) =>
  state.userProfile.loginUser;

export const selectLoginUserInfo = (state: RootState) =>
  state.userProfile.userInfos.find(
    userInfo => userInfo.uuid === state.userProfile.loginUser,
  );

export const selectAll = (state: RootState) => state;

export const selectUserInfoByUUID = (state: RootState, uuid: string) =>
  state.userProfile.userInfos.find(userInfo => userInfo.uuid === uuid);

export const selectUserInfoByUsername = (state: RootState, username: string) =>
  state.userProfile.userInfos.find(userInfo => userInfo.username === username);
