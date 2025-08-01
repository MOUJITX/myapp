import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';

import AssetCard from '../../../components/AssetCard/AssetCard';
import { ButtonShapeType } from '../../../components/basic/Button';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView from '../../../components/basic/SpacingView';
import SwipeRowList from '../../../components/basic/SwipeRowList';
import { Asset } from '../../../store/assetManagement/assetManagement.type';

import { useAssetListHook } from './assetListHook';

const AssetListScreen = () => {
  const {
    input: { assets },
    output: { handleRemoveAsset, gotoAssetAddScreen },
  } = useAssetListHook();

  const renderAssetItem = ({ item }: { item: Asset }) => (
    <AssetCard asset={item} onPress={() => gotoAssetAddScreen(item)} />
  );

  return (
    <View style={styles.container}>
      <SpacingView>
        <SwipeRowList
          renderItem={renderAssetItem}
          data={assets}
          shape={ButtonShapeType.Circle}
          size="large"
          rightButton={[
            {
              label: '-',
              type: 'danger',
              onPress: (item: Asset) => handleRemoveAsset(item.uuid),
              pressConfirm: {
                title: t('common.delete.confirm.title'),
                description: t('common.delete.confirm.description'),
              },
            },
          ]}
        />
      </SpacingView>

      <HoverButton onPress={gotoAssetAddScreen} label={t('common.add.icon')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AssetListScreen;
