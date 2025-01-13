import { RootState } from '../type';

export const selectIsUserLogin = (state: RootState) =>
  state.userProfile.isLogin;

export const selectLoginUser = (state: RootState) =>
  state.userProfile.loginUser;
