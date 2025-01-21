import { useSelector } from 'react-redux';
import {
  selectAll,
  selectIsUserLogin,
  selectLoginUserInfo,
} from '../../store/userProfile/userProfile.selectors';
import { envInfo } from '../../utils/envInfo';

type Input = {
  isLogin: boolean;
  loginUser?: string;
  loginUsername?: string;
  allState: string;
  envInfo: any;
};

type Output = {};

type DebugHook = {
  input: Input;
  output: Output;
};

export const useDebugHook = (): DebugHook => {
  const input: Input = {
    isLogin: useSelector(selectIsUserLogin),
    loginUser: useSelector(selectLoginUserInfo)?.uuid,
    loginUsername: useSelector(selectLoginUserInfo)?.username,
    allState: JSON.stringify(useSelector(selectAll), null, 2),
    envInfo: envInfo,
  };

  const output: Output = {
    logout: () => {},
  };
  return {
    input,
    output,
  };
};
