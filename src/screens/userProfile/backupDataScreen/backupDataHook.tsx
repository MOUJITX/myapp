import { useDispatch, useSelector } from 'react-redux';

import { navigateAction } from '../../../store/navigation/navigation.redux';
import { RootState } from '../../../store/type';
import {
  restoreAction,
  userLogoutAction,
} from '../../../store/userProfile/userProfile.redux';
import { selectAll } from '../../../store/userProfile/userProfile.selectors';

type Input = {
  allStateData: RootState;
};

type Output = {
  restoreData: (data: string) => void;
  logout: () => void;
};

type BackupDataHook = {
  input: Input;
  output: Output;
};

export const useBackupDataHook = (): BackupDataHook => {
  const input: Input = {
    allStateData: useSelector(selectAll),
  };

  const dispatch = useDispatch();

  const output: Output = {
    restoreData: (data: string) => {
      dispatch(restoreAction(data));
    },

    logout: () => {
      dispatch(userLogoutAction(''));
      dispatch(
        navigateAction({
          screen: 'WelcomeScreen',
          replace: true,
        }),
      );
    },
  };

  return {
    input,
    output,
  };
};
