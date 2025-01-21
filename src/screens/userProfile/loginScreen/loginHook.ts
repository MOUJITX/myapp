import { useDispatch, useSelector } from 'react-redux';
import { LoginPayload } from '../../../store/userProfile/userProfile.type';
import { userLoginAction } from '../../../store/userProfile/userProfile.redux';
import { selectIsUserLogin } from '../../../store/userProfile/userProfile.selectors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationList } from '../../../navigation/AppNavigationList';

type Input = {
  isLogin: boolean;
};

type Output = {
  handleLogin: (loginPayload: LoginPayload) => void;
  gotoDefaultScreen: () => void;
};

type LoginHook = {
  input: Input;
  output: Output;
};

export const useLoginHook = (): LoginHook => {
  const input: Input = {
    isLogin: useSelector(selectIsUserLogin),
  };

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<AppNavigationList>>();

  const output: Output = {
    handleLogin: loginPayload => {
      dispatch(userLoginAction(loginPayload));
    },
    gotoDefaultScreen: () => navigation.replace('PageA'),
  };

  return {
    input,
    output,
  };
};
