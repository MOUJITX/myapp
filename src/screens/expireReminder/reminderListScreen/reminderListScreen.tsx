import React, { useEffect, useRef, useState } from 'react';
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
    input: {
      allExpireReminderList,
      allGoodCategoriesList,
      categoryExpireReminderList,
    },
    output: { handleRemoveGood },
  } = useExpireReminderListHook();

  const AddScreenBottomSheetRef = useRef<BottomSheetRef>(null);
  const CategoryScreenBottomSheetRef = useRef<BottomSheetRef>(null);
  const [good, setGood] = useState<Good>();
  const [selectCategory, setSelectCategory] = useState<string>('all');
  const [reminderList, setReminderList] = useState<Good[]>(
    allExpireReminderList
  );

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

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
    if (category === 'all') {
      setReminderList(allExpireReminderList);
    } else {
      setReminderList(categoryExpireReminderList(category));
    }
  };

  useEffect(() => {
    if (selectCategory === 'all') {
      setReminderList(allExpireReminderList);
    } else {
      setReminderList(categoryExpireReminderList(selectCategory));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExpireReminderList]);

  return (
    <View style={style.container}>
      <SpacingView notScroll>
        <CategoryFilter
          data={allGoodCategoriesList}
          selectedValue={selectCategory}
          onSelect={handleSelectCategory}
          onPressMoreButton={openCategoryScreenBottomSheet}
        />
        <SwipeRowList
          renderItem={renderGoodItem}
          data={reminderList}
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
          bottomSheetRef={CategoryScreenBottomSheetRef}
          selected={selectCategory}
          onSelect={handleSelectCategory}
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
