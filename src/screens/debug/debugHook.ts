import { useDispatch, useSelector } from 'react-redux';
import {
  selectAll,
  selectIsUserLogin,
  selectLoginUserInfo,
} from '../../store/userProfile/userProfile.selectors';
import { envInfo } from '../../utils/envInfo';
import { userLogoutAction } from '../../store/userProfile/userProfile.redux';
import { navigateAction } from '../../store/navigation/navigation.redux';

type Input = {
  isLogin: boolean;
  loginUser?: string;
  loginUsername?: string;
  allState: string;
  envInfo: any;
};

type Output = {
  logout: () => void;
};

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

  const dispatch = useDispatch();

  const output: Output = {
    logout: () => {
      input.loginUser && dispatch(userLogoutAction(input.loginUser));
      dispatch(
        navigateAction({
          screen: 'WelcomeScreen',
          replace: true,
        })
      );
    },
  };

  return {
    input,
    output,
  };
};
