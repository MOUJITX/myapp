import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';

import Button from '../../../components/basic/Button';
import CellGroup from '../../../components/basic/CellGroup';
import CustomFormLabel from '../../../components/basic/CustomFormLabel';
import ImageRow from '../../../components/basic/ImageRow';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';
import SpacingView from '../../../components/basic/SpacingView';
import TextInput from '../../../components/basic/TextInput';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import TextLabel from '../../../components/basic/TextLabel';
import { pubApiUrl_barcode } from '../../../environment';
import { RouteProp } from '../../../navigation/AppNavigationList';
import {
  Good,
  GoodBrand,
  GoodItem,
} from '../../../store/expireReminder/expireReminder.type';
import { useComponentMount } from '../../../utils/componentMount';
import { request } from '../../../utils/request';
import {
  randomString,
  randomStringNumber,
  randomUUID,
} from '../../../utils/utils';
import { ReminderCategoryScreen } from '../reminderCategoryScreen/reminderCategoryScreen';

import ReminderAddCell from './reminderAddCell';
import { useExpireReminderAddHook } from './reminderAddHook';

export interface ReminderAddScreenProps {
  good?: Good;
}

export const ExpireReminderAddScreen = () => {
  const navigation = useNavigation();
  const { good }: ReminderAddScreenProps =
    useRoute<RouteProp<'ExpireReminderAdd'>>().params;

  const {
    input: { existGood },
    output: { handleSubmitGood },
  } = useExpireReminderAddHook();

  const [goodID, setGoodID] = useState<string | undefined>(good?.goodID);
  const [title, setTitle] = useState<string | undefined>(good?.title);
  const [imgs, setImgs] = useState<string[]>(good?.imgs ?? []);
  const [uniCode, setUniCode] = useState<string | undefined>(good?.uniqueCode);
  const [category, setCategory] = useState<string>(good?.type ?? 'default');
  const [brand, setBrand] = useState<GoodBrand>(good?.brand ?? {});
  const [items, setItems] = useState<GoodItem[]>(good?.items ?? []);

  const initItem: GoodItem = {
    itemID: randomUUID(),
    createTime: new Date(),
    expireDate: new Date(),
    productionDate: new Date(),
    lifeDays: 0,
    isUsed: false,
  };

  useComponentMount(() => {
    items.length === 0 && setItems([initItem]);
  });

  const handleAdd = (index: number) => {
    let newItems = [...items];
    newItems.splice(index + 1, 0, initItem);
    // console.log('handleAdd', newItems);
    setItems(newItems);
  };

  const handleCopy = (index: number) => {
    const copiedItem = { ...items[index], itemID: randomUUID() };
    let newItems = [...items];
    newItems.splice(index + 1, 0, copiedItem);
    setItems(newItems);
  };

  const handleDelete = (index: number) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleValueChange = (index: number, value: GoodItem) => {
    let newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleSubmitGoodCheck = useCallback(() => {
    handleSubmitGood({
      goodID: goodID ?? randomUUID(),
      title: title ?? randomString(),
      uniqueCode: uniCode ?? randomStringNumber(),
      imgs,
      type: category,
      brand,
      detail: {},
      items,
      createTime: good?.createTime ?? new Date(),
    });
  }, [
    brand,
    category,
    good?.createTime,
    goodID,
    handleSubmitGood,
    imgs,
    items,
    title,
    uniCode,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label={t('common.save.label')}
          type="primary"
          text
          onPress={handleSubmitGoodCheck}
        />
      ),
    });
  }, [handleSubmitGoodCheck, navigation]);

  const handleUnicodeChange = (value: string) => {
    setUniCode(value);
    if (value.length === 13) {
      const sameGood = existGood(value);
      if (sameGood) {
        setGoodID(sameGood.goodID);
        setTitle(sameGood.title);
        setImgs(sameGood.imgs);
        setCategory(sameGood.type);
        setBrand(sameGood.brand ?? {});
        setItems(sameGood.items);
      } else {
        request('get', pubApiUrl_barcode(value)).then((res: any) => {
          // console.log('res', res);
          if (res.code === 1) {
            const resData: {
              goodsName: string;
              brand: string;
              supplier: string;
            } = res.data;
            // console.log('resDate', resData);
            !title && setTitle(resData.goodsName);
            if (!brand || (!brand.brand && !brand.producer)) {
              setBrand({
                brand: resData.brand,
                producer: resData.supplier,
              });
            } else {
              !brand.brand && setBrand({ ...brand, brand: resData.brand });
              !brand.producer &&
                setBrand({ ...brand, producer: resData.supplier });
            }
          }
        });
      }
    }
  };

  const renderCameraScanButton = () => (
    <ScanCameraButton codeType={'ean-13'} onSuccess={handleUnicodeChange} />
  );

  return (
    <SpacingView>
      <CellGroup card>
        <TextInput
          value={title}
          onValueChange={value => setTitle(value)}
          placeholder={t('expireReminder.add.name.placeholder')}
        />
        <ImageRow
          imgs={imgs}
          size={'large'}
          radius
          upload
          onValueChange={value => setImgs(value)}
          folder={'goods'}
        />
        <TextInputCustom
          inline
          label={t('expireReminder.add.goodCode.label')}
          keyboardType="number"
          value={uniCode}
          onValueChange={handleUnicodeChange}
          placeholder={t('expireReminder.add.goodCode.placeholder')}
          right={renderCameraScanButton}
        />
        <TextLabel
          inline
          label={t('expireReminder.add.goodNumber.label')}
          value={items.length.toString()}
        />
        <ReminderCategoryScreen
          inline
          label={t('expireReminder.add.category.label')}
          selected={category}
          onSelect={setCategory}
          hideAll
        />
        <CustomFormLabel
          label={t('expireReminder.add.brand.label')}
          inline
          formFields={[
            {
              key: 'brand',
              label: t('expireReminder.add.brand.name.label'),
              type: 'text',
              inline: true,
            },
            {
              key: 'producer',
              label: t('expireReminder.add.brand.producer.label'),
              type: 'text',
              inline: true,
            },
          ]}
          formValue={brand}
          valueLabel={brand.brand ? brand.brand : brand.producer}
          onValueChange={value => setBrand(value)}
        />
      </CellGroup>
      {items.map((item, index) => (
        <ReminderAddCell
          item={item}
          itemNum={index}
          onAdd={() => handleAdd(index)}
          onCopy={() => handleCopy(index)}
          onDelete={() => handleDelete(index)}
          onValueChange={value => handleValueChange(index, value)}
          key={index}
        />
      ))}
    </SpacingView>
  );
};
