import { t } from 'i18next';
import { useRef, useState } from 'react';
import { Text } from 'react-native';

import AssetCard from '../../../components/AssetCard/AssetCard';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import Button, { ButtonShapeType } from '../../../components/basic/Button';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ImageRow from '../../../components/basic/ImageRow';
import NumberInput from '../../../components/basic/NumberInput';
import SwipeRowList from '../../../components/basic/SwipeRowList';
import Switch from '../../../components/basic/Switch';
import TextInput from '../../../components/basic/TextInput';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import {
  Asset,
  AssetBasic,
} from '../../../store/assetManagement/assetManagement.type';
import { calculateDays } from '../../../utils/datetime';
import { randomUUID } from '../../../utils/utils';

interface Props {
  asset?: Asset | AssetBasic;
  createUser: string;
  isAddition?: boolean;
  onChange?: (asset: Asset | AssetBasic) => void;
}

const AssetAddForm = (props: Props) => {
  const additionRef = useRef<BottomSheetRef>(null);

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
    createUser: props.createUser,
  };

  const [assetData, setAssetData] = useState<Asset | AssetBasic>(
    props.asset ?? (props.isAddition ? initAssetBasic : initAsset),
  );
  const [subAsset, setSubAsset] = useState<AssetBasic>();

  const handleValueChange = (key: keyof Asset, value: any) => {
    const newAsset: Asset | AssetBasic = { ...assetData, [key]: value };
    setAssetData(newAsset);
    props.onChange?.(newAsset);
  };

  const renderText = (text: string) => <Text>{text}</Text>;

  const newOutcome = (
    oldAll: AssetBasic[],
    newOne: AssetBasic,
  ): AssetBasic[] => {
    const assetIndex = oldAll.findIndex(asset => asset.uuid === newOne.uuid);
    const newAsset: AssetBasic = {
      ...newOne,
      purchasing: {
        ...newOne.purchasing,
        price: Number(newOne.purchasing.price),
      },
    };

    if (assetIndex !== -1) {
      return oldAll.map((oldOne, index) =>
        index === assetIndex ? newAsset : oldOne,
      );
    } else {
      return [...oldAll, newAsset];
    }
  };

  const renderAdditionItem = ({ item }: { item: Asset }) => (
    <AssetCard
      asset={item}
      onPress={() => {
        setSubAsset(item);
        additionRef.current?.openBottomSheet();
      }}
      inCard
    />
  );

  return (
    <>
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
          onValueChange={value => handleValueChange('using', value)}
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
              price: value,
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
                    enabled: true,
                    activeDate: new Date(),
                    overDate: new Date(),
                    durationDays: 0,
                  }
                : initAsset.warranty,
            )
          }
        />
        {assetData.warranty.enabled && (
          <>
            <DatetimePicker
              inline
              label={'激活时间'}
              value={assetData.warranty.activeDate ?? assetData.purchasing.date}
              maxDate={assetData?.warranty.overDate ?? new Date()}
              onValueChange={value =>
                handleValueChange('warranty', {
                  ...assetData.warranty,
                  activeDate: value,
                  durationDays: calculateDays(
                    value,
                    assetData.warranty.overDate,
                    true,
                  ),
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
              onValueChange={value => {
                const newDate = new Date(
                  assetData.warranty.activeDate ?? new Date(),
                );
                newDate.setDate(newDate.getDate() + (value ?? 0));

                handleValueChange('warranty', {
                  ...assetData.warranty,
                  durationDays: value,
                  overDate: newDate,
                });
              }}
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
                  durationDays: calculateDays(
                    value,
                    assetData.warranty.activeDate,
                    true,
                  ),
                })
              }
            />
          </>
        )}
      </CellGroup>
      {!props.isAddition && 'additionalFee' in assetData && (
        <CellGroup card title={'附加费用'}>
          <SwipeRowList
            renderItem={renderAdditionItem}
            data={assetData.additionalFee.outcome}
            shape={ButtonShapeType.Circle}
            size="large"
            rightButton={[
              {
                label: '-',
                type: 'danger',
                onPress: (item: Asset) =>
                  handleValueChange('additionalFee', {
                    outcome: assetData.additionalFee.outcome.filter(
                      addition => addition.uuid !== item.uuid,
                    ),
                  }),
                pressConfirm: {
                  title: t('common.delete.confirm.title'),
                  description: t('common.delete.confirm.description'),
                },
              },
            ]}
          />
          <Button
            label={t('common.add.icon')}
            plain
            type="primary"
            onPress={() => {
              additionRef.current?.openBottomSheet();
            }}
          />
          <BottomSheet
            ref={additionRef}
            headerRight={
              subAsset && {
                label: '+',
                onPress: () => {
                  subAsset &&
                    handleValueChange('additionalFee', {
                      outcome: newOutcome(
                        assetData.additionalFee.outcome,
                        subAsset,
                      ),
                    });
                  subAsset && additionRef.current?.closeBottomSheet();
                },
              }
            }
            onClose={() => setSubAsset(undefined)}>
            <AssetAddForm
              createUser={props.createUser}
              isAddition
              asset={subAsset}
              onChange={setSubAsset}
            />
          </BottomSheet>
        </CellGroup>
      )}
      <CellGroup card title={'备注'}>
        <TextInput
          value={assetData.note}
          textLines={5}
          onValueChange={value => handleValueChange('note', value)}
        />
      </CellGroup>
    </>
  );
};

export default AssetAddForm;
