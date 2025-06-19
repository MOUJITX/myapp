import { useDispatch } from 'react-redux';

import { userLoginAction } from '../../../store/userProfile/userProfile.redux';
import { LoginPayload } from '../../../store/userProfile/userProfile.type';

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
      dispatch(userLoginAction(loginPayload));
    },
  };

  return {
    input,
    output,
  };
};
