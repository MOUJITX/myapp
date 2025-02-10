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
import SwipeRow from '../../../components/basic/SwipeRow';
import { ButtonShapeType } from '../../../components/basic/Button';

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
    return (
      <SwipeRow
        rightButton={[
          {
            label: '-',
            type: 'danger',
            onPress: () => {
              // console.log('delete', item.goodID)
            },
          },
        ]}
        shape={ButtonShapeType.Circle}
        size="large"
      >
        <ReminderCard
          good={item}
          onPress={() => {
            // console.log('edit', item.goodID)
          }}
        />
      </SwipeRow>
    );
  };

  return (
    <View>
      <SpacingView notScroll>
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
