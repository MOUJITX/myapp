import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

import Button from '../../../components/basic/Button';
import SpacingView from '../../../components/basic/SpacingView';
import { RouteProp } from '../../../navigation/AppNavigationList';
import { Asset } from '../../../store/assetManagement/assetManagement.type';

import AssetAddForm from './assetAddForm';
import { useAssetAddHook } from './assetAddHook';

export interface AssetAddScreenProps {
  asset?: Asset;
}

const AssetAddScreen = () => {
  const navigation = useNavigation();
  const { asset }: AssetAddScreenProps =
    useRoute<RouteProp<'AssetAddScreen'>>().params;

  const {
    input: { createUser },
    output: { assetSubmit },
  } = useAssetAddHook();

  const [newAsset, setNewAsset] = useState<Asset>();

  const handleSubmit = useCallback(() => {
    if (newAsset) {
      const submitAsset: Asset = {
        ...newAsset,
        purchasing: {
          ...newAsset.purchasing,
          price: Number(newAsset.purchasing.price),
        },
      };
      assetSubmit(submitAsset);
    }
  }, [assetSubmit, newAsset]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label={t('common.save.label')}
          type={newAsset ? 'primary' : 'info'}
          text
          onPress={handleSubmit}
        />
      ),
    });
  }, [handleSubmit, navigation, newAsset]);

  return (
    <SpacingView>
      <AssetAddForm
        asset={asset}
        createUser={createUser}
        onChange={asset => setNewAsset(asset as Asset)}
      />
    </SpacingView>
  );
};

export default AssetAddScreen;
