import { useDispatch, useSelector } from 'react-redux';

import {
  selectAll,
  selectIsUserLogin,
  selectLoginUser,
} from '../../store/userProfile/userProfile.selectors';
import { userLoginFailureAction } from '../../store/userProfile/userProfile.redux';

type Input = {
  isLogin: boolean;
  loginUser?: string;
  allState: string;
};

type Output = {
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
    allState: JSON.stringify(useSelector(selectAll)),
  };

  const dispatch = useDispatch();

  const output: Output = {
    logout: () => {
      dispatch(userLoginFailureAction());
    },
  };
  return {
    input,
    output,
  };
};
