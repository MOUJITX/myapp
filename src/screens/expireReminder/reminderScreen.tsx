import React from 'react';
import { ScrollView, View } from 'react-native';
import ReminderCard from '../../components/expireReminder/ReminderCard';
import { t } from 'i18next';
import { useExpireReminderHook } from './reminderHook';
import HoverButton from '../../components/basic/HoverButton';

export const ExpireReminderScreen = () => {
  const {
    output: {},
  } = useExpireReminderHook();

  return (
    <View>
      <ScrollView>
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
      </ScrollView>

      <HoverButton
        onPress={() => {
          console.log('add');
        }}
        label="+"
      />
    </View>
  );
};
