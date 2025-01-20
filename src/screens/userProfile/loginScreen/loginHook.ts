import { useDispatch } from 'react-redux';
import { LoginPayload } from '../../../store/userProfile/userProfile.type';
import { userLoginAction } from '../../../store/userProfile/userProfile.redux';

type Input = {};

type Output = {
  handleLogin: (loginPayload: LoginPayload) => void;
};

type LoginHook = {
  input: Input;
  output: Output;
};

export const useLoginHook = (): LoginHook => {
  const input: Input = {};

  const dispatch = useDispatch();

  const output: Output = {
    handleLogin: loginPayload => {
      console.log('loginPayload', loginPayload);
      dispatch(userLoginAction(loginPayload));
    },
  };

  return {
    input,
    output,
  };
};
