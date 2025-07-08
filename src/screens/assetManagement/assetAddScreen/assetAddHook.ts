import { useDispatch, useSelector } from 'react-redux';

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

  return {
    input: {
      createUser: useSelector(selectLoginUserUUID) ?? '',
    },
    output: {
      assetSubmit: (asset: Asset) => {
        console.log('submit asset', asset);
        dispatch(goBackAction());
      },
    },
  };
};
