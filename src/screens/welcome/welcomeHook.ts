import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationList } from '../../navigation/AppNavigationList';
import { useSelector } from 'react-redux';
import { selectIsUserLogin } from '../../store/userProfile/userProfile.selectors';

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

  const output: Output = {
    gotoLoginScreen: () => navigation.replace('LoginScreen'),
    gotoDefaultScreen: () => navigation.replace('PageA'),
  };

  return {
    input,
    output,
  };
};
