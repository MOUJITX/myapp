import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';

import AssetCard from '../../../components/AssetCard/AssetCard';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView from '../../../components/basic/SpacingView';

import { useAssetListHook } from './assetListHook';

const AssetListScreen = () => {
  const {
    input: { assets },
    output: { gotoAssetAddScreen },
  } = useAssetListHook();

  return (
    <View style={styles.container}>
      <SpacingView>
        {assets.map(asset => (
          <AssetCard asset={asset} onPress={() => gotoAssetAddScreen(asset)} />
        ))}
      </SpacingView>

      <HoverButton onPress={gotoAssetAddScreen} label={t('common.add.icon')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AssetListScreen;
