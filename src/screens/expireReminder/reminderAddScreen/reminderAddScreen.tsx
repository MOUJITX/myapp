import React, { RefObject, useState } from 'react';
import { View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';
import {
  Good,
  GoodBrand,
  GoodItem,
} from '../../../store/expireReminder/expireReminder.type';
import {
  randomString,
  randomStringNumber,
  randomUUID,
} from '../../../utils/utils';
import ReminderAddCell from './reminderAddCell';
import { useComponentMount } from '../../../utils/componentMount';
import { useExpireReminderAddHook } from './reminderAddHook';
import { BottomSheetRef } from '../../../components/basic/BottomSheet';
import { t } from 'i18next';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';
import { ReminderCategoryScreen } from '../reminderCategoryScreen/reminderCategoryScreen';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import CustomFormLabel from '../../../components/basic/CustomFormLabel';
import { request } from '../../../utils/request';
import { pubApiUrl_barcode } from '../../../environment';

interface Props {
  bottomSheetRef: RefObject<BottomSheetRef>;
  good?: Good;
}

export const ExpireReminderAddScreen = (props: Props) => {
  const {
    input: {},
    output: { handleSubmitGood },
  } = useExpireReminderAddHook();

  const [title, setTitle] = useState<string | undefined>(props.good?.title);
  const [imgs, setImgs] = useState<string[]>(props.good?.imgs ?? []);
  const [uniCode, setUniCode] = useState<string | undefined>(
    props.good?.uniqueCode
  );
  const [category, setCategory] = useState<string>(
    props.good?.type ?? 'default'
  );
  const [brand, setBrand] = useState<GoodBrand>(props.good?.brand ?? {});
  const [items, setItems] = useState<GoodItem[]>(props.good?.items ?? []);

  const initItem: GoodItem = {
    itemID: randomUUID(),
    createTime: new Date(),
    expireDate: new Date(),
    productionDate: new Date(),
    lifeDays: 0,
    isUsed: false,
  };

  useComponentMount(() => {
    items.length === 0 ? setItems([initItem]) : undefined;
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

  const handleSubmitGoodCheck = () => {
    handleSubmitGood({
      goodID: props.good?.goodID ?? randomUUID(),
      title: title ?? randomString(),
      uniqueCode: uniCode ?? randomStringNumber(),
      imgs,
      type: category,
      brand,
      detail: {},
      items,
      createTime: props.good?.createTime ?? new Date(),
    });

    props.bottomSheetRef.current?.closeBottomSheet();
  };

  const handleUnicodeChange = (value: string) => {
    setUniCode(value);
    if (value.length === 13) {
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
          !brand.brand && setBrand({ ...brand, brand: resData.brand });
          !brand.producer && setBrand({ ...brand, producer: resData.supplier });
        }
      });
    }
  };

  const renderCameraScanButton = () => (
    <ScanCameraButton codeType={'ean-13'} onSuccess={handleUnicodeChange} />
  );

  return (
    <SpacingView>
      <View>
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
            label="品牌"
            inline
            formFields={[
              {
                key: 'brand',
                label: '品牌',
                type: 'text',
                inline: true,
              },
              {
                key: 'producer',
                label: '厂商',
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
        <Button
          type="primary"
          label={t('common.save.label')}
          onPress={handleSubmitGoodCheck}
        />
      </View>
    </SpacingView>
  );
};
