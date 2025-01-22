import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationList } from '../../navigation/AppNavigationList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsUserLogin,
  selectLoginUserInfo,
} from '../../store/userProfile/userProfile.selectors';
import { userAddLoginHistoryAction } from '../../store/userProfile/userProfile.redux';

type Input = {
  isLogin: boolean;
};

type Output = {
  gotoLoginScreen: () => void;
  gotoDefaultScreen: () => void;
};

type WelcomeHook = {
  input: Input;
  output: Output;
};

export const useWelcomeHook = (): WelcomeHook => {
  const input: Input = {
    isLogin: useSelector(selectIsUserLogin),
  };

  const navigation = useNavigation<StackNavigationProp<AppNavigationList>>();
  const dispatch = useDispatch();

  const loginUser = useSelector(selectLoginUserInfo)?.uuid;

  const output: Output = {
    gotoLoginScreen: () => navigation.replace('LoginScreen'),
    gotoDefaultScreen: () => {
      navigation.replace('ExpireReminderScreen');
      loginUser &&
        dispatch(
          userAddLoginHistoryAction({
            uuid: loginUser,
            loginTime: new Date(),
            actionType: 'login',
            isSuccess: true,
            isManual: false,
          })
        );
    },
  };

  return {
    input,
    output,
  };
};
