import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';

import AssetCard from '../../../components/AssetCard/AssetCard';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView from '../../../components/basic/SpacingView';
import { Asset } from '../../../store/assetManagement/assetManagement.type';
import { randomUUID } from '../../../utils/utils';

const AssetListScreen = () => {
  const asset: Asset = {
    uuid: randomUUID(),
    name: 'Xiaomi 15',
    category: 'Phone',
    imgs: ['1'],
    using: false,
    deactivateDate: new Date('2025-01-11'),
    purchasing: {
      price: 100,
      date: new Date('2025-01-01'),
      source: 'Xiaomi Home',
      store: 'Jianghan Rd.',
    },
    warranty: {
      enabled: true,
      activeDate: new Date('2025-01-01'),
      overDate: new Date('2027-01-01'),
      durationDays: 365 * 2,
    },
    additionalFee: {
      outcome: [
        {
          uuid: '',
          name: '',
          category: '',
          imgs: [],
          using: false,
          deactivateDate: new Date('2025-01-06'),
          purchasing: {
            price: 10,
            date: new Date('2025-01-01'),
          },
          warranty: {
            enabled: false,
          },
          note: '',
        },
      ],
    },
    note: 'Xiaomi 15, 16GB RAM, 512GB ROM',
    createTime: new Date(),
    createUser: 'user01',
  };

  return (
    <View style={styles.container}>
      <SpacingView>
        <AssetCard asset={asset} onPress={() => {}} />
      </SpacingView>

      <HoverButton onPress={() => {}} label={t('common.add.icon')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AssetListScreen;
