import { useDispatch, useSelector } from 'react-redux';

import { userLogoutAction } from '../../store/userProfile/userProfile.redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationList } from '../../navigation/AppNavigationList';
import { selectLoginUserInfo } from '../../store/userProfile/userProfile.selectors';

type Input = {};

type Output = {
  logout: () => void;
};

type Page1Hook = {
  input: Input;
  output: Output;
};

export const usePage1Hook = (): Page1Hook => {
  const input: Input = {};

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<AppNavigationList>>();

  const loginUser = useSelector(selectLoginUserInfo)?.uuid;

  const output: Output = {
    logout: () => {
      loginUser && dispatch(userLogoutAction(loginUser));
      navigation.replace('LoginScreen');
    },
  };
  return {
    input,
    output,
  };
};
