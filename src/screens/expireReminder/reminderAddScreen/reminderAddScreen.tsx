import React, { RefObject, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';
import {
  Good,
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
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import { t } from 'i18next';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';
import { ReminderCategoryScreen } from '../reminderCategoryScreen/reminderCategoryScreen';

interface Props {
  bottomSheetRef: RefObject<BottomSheetRef>;
  good?: Good;
}

export const ExpireReminderAddScreen = (props: Props) => {
  const {
    input: { categoryLabel },
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
  const [items, setItems] = useState<GoodItem[]>(props.good?.items ?? []);

  const CategoryScreenBottomSheetRef = useRef<BottomSheetRef>(null);

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
      detail: {},
      items,
      createTime: props.good?.createTime ?? new Date(),
    });

    props.bottomSheetRef.current?.closeBottomSheet();
  };

  const renderCameraScanButton = () => (
    <ScanCameraButton onSuccess={value => setUniCode(value)} />
  );

  const openCategorySelectScreenBottomSheet = () => {
    CategoryScreenBottomSheetRef.current?.openBottomSheet();
  };

  return (
    <SpacingView>
      <Text>ExpireReminderAddScreen</Text>
      <View>
        <CellGroup card>
          <TextInput
            inline
            value={title}
            onValueChange={value => setTitle(value)}
            placeholder={t('expireReminder.add.name.placeholder')}
          />
          <ImageRow
            imgs={imgs}
            size={'large'}
            radius
            onValueChange={value => setImgs(value)}
          />
          <TextInput
            inline
            label={t('expireReminder.add.goodCode.label')}
            type="number"
            value={uniCode}
            onValueChange={value => setUniCode(value)}
            placeholder={t('expireReminder.add.goodCode.placeholder')}
            right={renderCameraScanButton}
          />
          <TextLabel
            inline
            label={t('expireReminder.add.goodNumber.label')}
            value={items.length.toString()}
          />
          <TextLabel
            inline
            label={t('expireReminder.add.category.label')}
            value={categoryLabel(category)}
            textColor="primary"
            onTextPress={openCategorySelectScreenBottomSheet}
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

      <BottomSheet ref={CategoryScreenBottomSheetRef}>
        <ReminderCategoryScreen
          bottomSheetRef={CategoryScreenBottomSheetRef}
          selected={category}
          onSelect={setCategory}
          hideAll
        />
      </BottomSheet>
    </SpacingView>
  );
};
