import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import { ButtonShapeType } from '../../../components/basic/Button';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView from '../../../components/basic/SpacingView';
import SwipeRowList from '../../../components/basic/SwipeRowList';
import CategoryFilter from '../../../components/expireReminder/CategoryFilter';
import ReminderCard from '../../../components/expireReminder/ReminderCard';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import { ExpireReminderAddScreen } from '../reminderAddScreen/reminderAddScreen';

import { useExpireReminderListHook } from './reminderListHook';

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
  const [good, setGood] = useState<Good>();
  const [selectCategory, setSelectCategory] = useState<string>('all');
  const [reminderList, setReminderList] = useState<Good[]>(
    allExpireReminderList,
  );

  const openAddReminderBottomSheet = () => {
    setGood(undefined);
    AddScreenBottomSheetRef.current?.openBottomSheet();
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
          showMoreButton
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
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
