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

export const ExpireReminderListScreen = () => {
  const {
    input: { allExpireReminderList },
    output: { handleRemoveGood },
  } = useExpireReminderListHook();

  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [good, setGood] = useState<Good>();

  const openAddReminderBottomSheet = () => {
    setGood(undefined);
    bottomSheetRef.current?.openBottomSheet();
  };

  const renderGoodItem = ({ item }: { item: Good }) => {
    return (
      <ReminderCard
        good={item}
        onPress={() => {
          setGood(item);
          bottomSheetRef.current?.openBottomSheet();
        }}
      />
    );
  };

  return (
    <View style={style.container}>
      <SpacingView notScroll>
        <CategoryFilter
          data={[
            { label: '全部', value: 'all' },
            { label: '进行中', value: 'processing' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
            { label: '已完成', value: 'completed' },
          ]}
          selectedValue={'all'}
          onSelect={value => console.log(value)}
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

      <BottomSheet
        ref={bottomSheetRef}
        children={
          <ExpireReminderAddScreen
            bottomSheetRef={bottomSheetRef}
            good={good}
          />
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
