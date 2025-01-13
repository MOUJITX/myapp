import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigationList } from '../../navigation/AppNavigationList';
import { useSelector } from 'react-redux';
import { selectIsUserLogin } from '../../store/userProfile/userProfile.selectors';

type Input = {
  isLogin: boolean;
};

type Output = {
  gotoPageA: () => void;
  gotoPageB: () => void;
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
    gotoPageA: () => navigation.replace('PageA'),
    gotoPageB: () => navigation.replace('PageB'),
  };

  return {
    input,
    output,
  };
};
