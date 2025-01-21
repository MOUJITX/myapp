export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserInfo extends LoginPayload {
  uuid: string;
  createTime: Date;
}

export interface LoginHistory {
  uuid: string;
  loginTime: Date;
  actionType: 'login' | 'logout';
  isSuccess: boolean;
  isManual: boolean;
}

export interface UserProfileState {
  isLogin: boolean;
  loginUser?: string;
  userInfos: UserInfo[];
  loginHistory: LoginHistory[];
}
