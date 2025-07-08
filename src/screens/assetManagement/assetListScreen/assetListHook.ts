import { useDispatch } from 'react-redux';

import { Asset } from '../../../store/assetManagement/assetManagement.type';
import { navigateAction } from '../../../store/navigation/navigation.redux';

type Input = {};

type Output = { gotoAssetAddScreen: (asset?: Asset) => void };

type AssetListHook = {
  input: Input;
  output: Output;
};

export const useAssetListHook = (): AssetListHook => {
  const dispatch = useDispatch();

  return {
    input: {},
    output: {
      gotoAssetAddScreen: (asset?: Asset) =>
        dispatch(
          navigateAction({ screen: 'AssetAddScreen', params: { asset } }),
        ),
    },
  };
};
