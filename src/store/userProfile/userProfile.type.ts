export interface UserInfo {
  uuid: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserProfileState {
  isLogin: boolean;
  loginUser?: string;
  userInfo: UserInfo[];
}
