import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import Button from '../../../components/basic/Button';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ImageRow from '../../../components/basic/ImageRow';
import NumberInput from '../../../components/basic/NumberInput';
import SpacingView from '../../../components/basic/SpacingView';
import Switch from '../../../components/basic/Switch';
import TextInput from '../../../components/basic/TextInput';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import { RouteProp } from '../../../navigation/AppNavigationList';
import {
  Asset,
  AssetBasic,
} from '../../../store/assetManagement/assetManagement.type';
import { randomUUID } from '../../../utils/utils';

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

  const initAssetBasic: AssetBasic = {
    uuid: randomUUID(),
    name: '',
    category: '',
    imgs: [],
    using: true,
    deactivateDate: undefined,
    purchasing: {
      price: 0,
      date: new Date(),
      source: undefined,
      store: undefined,
    },
    warranty: {
      enabled: false,
      activeDate: undefined,
      overDate: undefined,
      durationDays: undefined,
    },
    note: '',
  };

  const initAsset: Asset = {
    ...initAssetBasic,
    additionalFee: {
      outcome: [],
    },
    createTime: new Date(),
    createUser,
  };

  const [assetData, setAssetData] = useState<Asset>(asset ?? initAsset);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label={t('common.save.label')}
          type="primary"
          text
          onPress={() => assetSubmit(assetData)}
        />
      ),
    });
  }, [assetData, assetSubmit, navigation]);

  const handleValueChange = (key: keyof Asset, value: any) => {
    setAssetData(prev => ({ ...prev, [key]: value }));
    return;
  };

  const renderText = (text: string) => <Text>{text}</Text>;

  return (
    <SpacingView>
      <CellGroup card title={'资产数据'}>
        <TextInput
          value={assetData.name}
          onValueChange={value => handleValueChange('name', value)}
        />
        <ImageRow
          imgs={assetData.imgs}
          size={'large'}
          radius
          upload
          onValueChange={imgs => handleValueChange('imgs', imgs)}
          folder={'assetManagement'}
        />
        <TextInput
          inline
          label={'类别'}
          value={assetData.category}
          onValueChange={value => handleValueChange('category', value)}
        />
        <Switch
          inline
          label={'使用中'}
          value={assetData.using}
          onValueChange={value => {
            handleValueChange('using', value);
            !value && handleValueChange('deactivateDate', undefined);
          }}
        />
        {!assetData.using && (
          <DatetimePicker
            inline
            label={'停用日期'}
            minDate={assetData.purchasing.date}
            maxDate={new Date()}
            value={assetData.deactivateDate}
            onValueChange={value => handleValueChange('deactivateDate', value)}
          />
        )}
      </CellGroup>
      <CellGroup card title={'购买记录'}>
        <TextInputCustom
          inline
          label={'价格'}
          keyboardType="decimal"
          value={assetData.purchasing.price.toString()}
          onValueChange={value =>
            handleValueChange('purchasing', {
              ...assetData.purchasing,
              price: Number(value),
            })
          }
          left={() => renderText('￥')}
          right={() => renderText('元')}
        />
        <DatetimePicker
          inline
          label={'购买日期'}
          maxDate={new Date()}
          value={assetData.purchasing.date}
          onValueChange={value =>
            handleValueChange('purchasing', {
              ...assetData.purchasing,
              date: value,
            })
          }
        />
        <TextInput
          inline
          label={'购买渠道'}
          value={assetData.purchasing.source}
          onValueChange={value =>
            handleValueChange('purchasing', {
              ...assetData.purchasing,
              source: value,
            })
          }
        />
        <TextInput
          inline
          label={'商家'}
          value={assetData.purchasing.store}
          onValueChange={value =>
            handleValueChange('purchasing', {
              ...assetData.purchasing,
              store: value,
            })
          }
        />
      </CellGroup>
      <CellGroup card title={'保修信息'}>
        <Switch
          inline
          label={'保修'}
          value={assetData.warranty.enabled}
          onValueChange={value =>
            handleValueChange(
              'warranty',
              value
                ? {
                    ...assetData.warranty,
                    enabled: value,
                  }
                : { ...initAsset.warranty, enabled: value },
            )
          }
        />
        {assetData.warranty.enabled && (
          <>
            <DatetimePicker
              inline
              label={'激活时间'}
              value={assetData.warranty.activeDate}
              minDate={assetData.purchasing.date}
              maxDate={asset?.warranty.overDate ?? new Date()}
              onValueChange={value =>
                handleValueChange('warranty', {
                  ...assetData.warranty,
                  activeDate: value,
                })
              }
            />
            <NumberInput
              inline
              label={'保修天数'}
              min={0}
              value={assetData.warranty.durationDays}
              quickValues={[
                { label: '一年', value: 365 },
                { label: '两年', value: 730 },
                { label: '三年', value: 1095 },
              ]}
              onValueChange={value =>
                handleValueChange('warranty', {
                  ...assetData.warranty,
                  durationDays: value,
                })
              }
            />
            <DatetimePicker
              inline
              label={'过保日期'}
              value={assetData.warranty.overDate}
              minDate={assetData.warranty.activeDate}
              onValueChange={value =>
                handleValueChange('warranty', {
                  ...assetData.warranty,
                  overDate: value,
                })
              }
            />
          </>
        )}
      </CellGroup>
      <CellGroup card title={'附加费用'}></CellGroup>
      <CellGroup card title={'备注'}>
        <TextInput
          value={assetData.note}
          textLines={5}
          onValueChange={value => handleValueChange('note', value)}
        />
      </CellGroup>
    </SpacingView>
  );
};

export default AssetAddScreen;
