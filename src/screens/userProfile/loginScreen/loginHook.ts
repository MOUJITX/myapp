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

  const output: Output = {
    handleLogin: loginPayload => {
      console.log('loginPayload', loginPayload);
    },
  };

  return {
    input,
    output,
  };
};
