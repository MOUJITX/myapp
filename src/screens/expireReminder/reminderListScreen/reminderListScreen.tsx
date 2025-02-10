import React, { useRef, useState } from 'react';
import { View } from 'react-native';
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
    <View>
      <SpacingView notScroll>
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
