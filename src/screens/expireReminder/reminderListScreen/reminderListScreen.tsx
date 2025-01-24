import React, { useRef } from 'react';
import { View } from 'react-native';
import { t } from 'i18next';
import { useExpireReminderListHook } from './reminderListHook';
import HoverButton from '../../../components/basic/HoverButton';
import { ExpireReminderAddScreen } from '../reminderAddScreen/reminderAddScreen';
import ReminderCard from '../../../components/expireReminder/ReminderCard';
import SpacingView from '../../../components/basic/SpacingView';
import BottomSheet, {
  BottomSheetRef,
} from '../../../components/basic/BottomSheet';

export const ExpireReminderListScreen = () => {
  const {
    output: {},
  } = useExpireReminderListHook();

  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const openAddReminderBottomSheet = () => {
    bottomSheetRef.current?.openBottomSheet();
  };

  return (
    <View>
      <SpacingView>
        <ReminderCard
          title={t('debug.longText')}
          img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
          dosage="100mg"
          frequency="2 times/day"
          items={[
            { expireDate: new Date('2024-3-12') },
            { expireDate: new Date('2024-3-12') },
          ]}
        />
        <ReminderCard
          title={t('debug.longText')}
          img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
          items={[
            { expireDate: new Date('2025-3-12') },
            { expireDate: new Date('2025-3-12') },
          ]}
        />

        <ReminderCard
          title={t('debug.longText')}
          img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
          dosage="100mg"
          storage="25℃"
          frequency="2 times/day"
          items={[
            { expireDate: new Date('2025-1-23') },
            { expireDate: new Date('2025-3-12') },
          ]}
        />

        <ReminderCard
          title={t('debug.longText')}
          img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
          storage="25℃"
          items={[
            { expireDate: new Date('2025-3-12') },
            { expireDate: new Date('2025-3-12') },
          ]}
        />

        <ReminderCard
          title={'medicine name'}
          img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
          storage="25℃"
          items={[
            { expireDate: new Date('2025-3-12') },
            { expireDate: new Date('2025-3-12') },
          ]}
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
