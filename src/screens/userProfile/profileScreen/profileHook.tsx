import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../../../store/userProfile/userProfile.redux';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';
import { navigateAction } from '../../../store/navigation/navigation.redux';

type Input = {};

type Output = {
  logout: () => void;
  gotoBackupScreen: () => void;
  gotoDeviceInfoScreen: () => void;
  gotoStateDataScreen: () => void;
  gotoPage2: () => void;
  gotoPage3: () => void;
};

type ProfileHook = {
  input: Input;
  output: Output;
};

export const useProfileHook = (): ProfileHook => {
  const input: Input = {};

  const dispatch = useDispatch();
  const loginUser = useSelector(selectLoginUserUUID);

  const output: Output = {
    logout: () => {
      loginUser && dispatch(userLogoutAction(loginUser));
      dispatch(
        navigateAction({
          screen: 'WelcomeScreen',
          replace: true,
        }),
      );
    },
    gotoBackupScreen: () =>
      dispatch(navigateAction({ screen: 'BackupDataScreen' })),
    gotoDeviceInfoScreen: () =>
      dispatch(navigateAction({ screen: 'DeviceInfo' })),
    gotoStateDataScreen: () =>
      dispatch(navigateAction({ screen: 'StateData' })),
    gotoPage2: () => dispatch(navigateAction({ screen: 'PageB' })),
    gotoPage3: () => dispatch(navigateAction({ screen: 'PageC' })),
  };

  return {
    input,
    output,
  };
};
