import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { useExpireReminderListHook } from './reminderListHook';
import HoverButton from '../../../components/basic/HoverButton';
import { ExpireReminderAddScreen } from '../reminderAddScreen/reminderAddScreen';
import ReminderCard from '../../../components/expireReminder/ReminderCard';
import SpacingView from '../../../components/basic/SpacingView';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import IconAdd from '../../../assets/icons/addCircle.svg';

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
      <SpacingView notScroll>
        <IconAdd width="40" height="40" />
        <FlatList
          data={allExpireReminderList}
          renderItem={renderGoodItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // refreshControl={<RefreshControl refreshing />}
        />
      </SpacingView>

      <HoverButton onPress={openAddReminderBottomSheet} label="+" />

      <BottomSheet
        ref={bottomSheetRef}
        children={<ExpireReminderAddScreen bottomSheetRef={bottomSheetRef} />}
      />
    </View>
  );
};
