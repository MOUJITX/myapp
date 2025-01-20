export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserInfo extends LoginPayload {
  uuid: string;
}

export interface UserProfileState {
  isLogin: boolean;
  loginUser?: string;
  userInfos: UserInfo[];
}
