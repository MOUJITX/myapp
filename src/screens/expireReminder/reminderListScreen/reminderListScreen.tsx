import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useExpireReminderListHook } from './reminderListHook';
import HoverButton from '../../../components/basic/HoverButton';
import { ExpireReminderAddScreen } from '../reminderAddScreen/reminderAddScreen';
import ReminderCard from '../../../components/expireReminder/ReminderCard';
import SpacingView from '../../../components/basic/SpacingView';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import SwipeRowList from '../../../components/basic/SwipeRowList';
import { ButtonShapeType } from '../../../components/basic/Button';
import CategoryFilter from '../../../components/expireReminder/CategoryFilter';
import { ReminderCategoryScreen } from '../reminderCategoryScreen/reminderCategoryScreen';

export const ExpireReminderListScreen = () => {
  const {
    input: { allExpireReminderList },
    output: { handleRemoveGood },
  } = useExpireReminderListHook();

  const AddScreenBottomSheetRef = useRef<BottomSheetRef>(null);
  const CategoryScreenBottomSheetRef = useRef<BottomSheetRef>(null);
  const [good, setGood] = useState<Good>();
  const [selectCategory, setSelectCategory] = useState('all');

  const openAddReminderBottomSheet = () => {
    setGood(undefined);
    AddScreenBottomSheetRef.current?.openBottomSheet();
  };

  const openCategoryScreenBottomSheet = () => {
    CategoryScreenBottomSheetRef.current?.openBottomSheet();
  };

  const renderGoodItem = ({ item }: { item: Good }) => {
    return (
      <ReminderCard
        good={item}
        onPress={() => {
          setGood(item);
          AddScreenBottomSheetRef.current?.openBottomSheet();
        }}
      />
    );
  };

  return (
    <View style={style.container}>
      <SpacingView notScroll>
        <CategoryFilter
          data={[
            { label: '全部', value: 'all', isDefault: true },
            { label: '药品', value: 'medicine', isDefault: true },
            { label: '食物', value: 'food', isDefault: true },
          ]}
          selectedValue={selectCategory}
          onSelect={value => setSelectCategory(value)}
          onPressMoreButton={openCategoryScreenBottomSheet}
        />
        <SwipeRowList
          renderItem={renderGoodItem}
          data={allExpireReminderList}
          rightButton={[
            {
              label: '-',
              type: 'danger',
              onPress: (item: Good) => handleRemoveGood(item.goodID),
            },
          ]}
          shape={ButtonShapeType.Circle}
          size="large"
        />
      </SpacingView>

      <HoverButton onPress={openAddReminderBottomSheet} label="+" />

      <BottomSheet ref={AddScreenBottomSheetRef}>
        <ExpireReminderAddScreen
          bottomSheetRef={AddScreenBottomSheetRef}
          good={good}
        />
      </BottomSheet>

      <BottomSheet ref={CategoryScreenBottomSheetRef}>
        <ReminderCategoryScreen
          selected={selectCategory}
          onSelect={setSelectCategory}
        />
      </BottomSheet>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
