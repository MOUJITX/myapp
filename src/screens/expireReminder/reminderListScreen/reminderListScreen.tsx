import React, { useRef } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useExpireReminderListHook } from './reminderListHook';
import HoverButton from '../../../components/basic/HoverButton';
import { ExpireReminderAddScreen } from '../reminderAddScreen/reminderAddScreen';
import ReminderCard from '../../../components/expireReminder/ReminderCard';
import SpacingView from '../../../components/basic/SpacingView';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import { Good } from '../../../store/expireReminder/expireReminder.type';

export const ExpireReminderListScreen = () => {
  const {
    input: { allExpireReminderList },
    output: {},
  } = useExpireReminderListHook();

  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openAddReminderBottomSheet = () => {
    bottomSheetRef.current?.openBottomSheet();
  };

  const renderGoodItem = ({ item }: { item: Good }) => {
    return <ReminderCard good={item} />;
  };

  return (
    <View>
      <SpacingView>
        <FlatList
          data={allExpireReminderList}
          renderItem={renderGoodItem}
          refreshControl={<RefreshControl refreshing />}
        />
      </SpacingView>

      <HoverButton onPress={openAddReminderBottomSheet} label="+" />

      <BottomSheet
        ref={bottomSheetRef}
        children={<ExpireReminderAddScreen />}
      />
    </View>
  );
};
