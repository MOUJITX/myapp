import { useDispatch, useSelector } from 'react-redux';

import { editAssetAction } from '../../../store/assetManagement/assetManagement.redux';
import { Asset } from '../../../store/assetManagement/assetManagement.type';
import { goBackAction } from '../../../store/navigation/navigation.redux';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';

type Input = {
  createUser: string;
};

type Output = {
  assetSubmit: (asset: Asset) => void;
};

type AssetAddHook = {
  input: Input;
  output: Output;
};

export const useAssetAddHook = (): AssetAddHook => {
  const dispatch = useDispatch();
  const loginUser = useSelector(selectLoginUserUUID) ?? '';

  return {
    input: {
      createUser: loginUser,
    },
    output: {
      assetSubmit: (asset: Asset) => {
        dispatch(editAssetAction({ asset, loginUser }));
        dispatch(goBackAction());
      },
    },
  };
};
