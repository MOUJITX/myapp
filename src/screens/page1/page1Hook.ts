import { useDispatch, useSelector } from 'react-redux';

import { randomUUID } from '../../utils/utils';
import {
  selectIsUserLogin,
  selectLoginUser,
} from '../../store/userProfile/userProfile.selectors';
import {
  userLoginFailure,
  userLoginSuccess,
} from '../../store/userProfile/userProfile.redux';

type Input = {
  isLogin: boolean;
  loginUser?: string;
};

type Output = {
  login: () => void;
  logout: () => void;
};

type Page1Hook = {
  input: Input;
  output: Output;
};

export const usePage1Hook = (): Page1Hook => {
  const input: Input = {
    isLogin: useSelector(selectIsUserLogin),
    loginUser: useSelector(selectLoginUser),
  };

  const dispatch = useDispatch();

  const output: Output = {
    login: () => {
      dispatch(userLoginSuccess(randomUUID()));
    },
    logout: () => {
      dispatch(userLoginFailure());
    },
  };
  return {
    input,
    output,
  };
};
