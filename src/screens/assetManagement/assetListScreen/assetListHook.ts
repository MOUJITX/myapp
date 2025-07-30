import { useDispatch, useSelector } from 'react-redux';

import { selectAllManagementAsset } from '../../../store/assetManagement/assetManagement.selectors';
import { Asset } from '../../../store/assetManagement/assetManagement.type';
import { navigateAction } from '../../../store/navigation/navigation.redux';

type Input = {
  assets: Asset[];
};

type Output = { gotoAssetAddScreen: (asset?: Asset) => void };

type AssetListHook = {
  input: Input;
  output: Output;
};

export const useAssetListHook = (): AssetListHook => {
  const dispatch = useDispatch();

  return {
    input: {
      assets: useSelector(selectAllManagementAsset),
    },
    output: {
      gotoAssetAddScreen: (asset?: Asset) =>
        dispatch(
          navigateAction({ screen: 'AssetAddScreen', params: { asset } }),
        ),
    },
  };
};
