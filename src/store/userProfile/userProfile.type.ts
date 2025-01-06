export interface UserInfo {
  uuid: string;
  username: string;
}

export interface UserProfileState {
  isLogin: boolean;
  loginUser?: string;
  userInfo: UserInfo[];
}
