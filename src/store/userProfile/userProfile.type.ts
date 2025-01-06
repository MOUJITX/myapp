export interface UserInfo {
  uuid: string;
  username: string;
}

export interface UserProfile {
  isLogin: boolean;
  loginUser?: string;
  userInfo: UserInfo[];
}
