import React from 'react';
import { View, Button } from 'react-native';
import { usePage1Hook } from './page1Hook';
import ReminderCard from '../../components/expireReminder/ReminderCard';
import { t } from 'i18next';

export const PageA = () => {
  const {
    output: { logout, gotoDebugScreen },
  } = usePage1Hook();

  return (
    <View>
      <ReminderCard
        title={t('debug.longText')}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={true}
        expireDate={new Date('2024-3-12')}
        dosage="100mg"
        frequency="2 times/day"
      />
      <ReminderCard
        title={t('debug.longText')}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={true}
        expireDate={new Date('2025-3-12')}
      />

      <ReminderCard
        title={t('debug.longText')}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={false}
        expireDate={new Date('2025-3-12')}
        dosage="100mg"
        storage="25℃"
        frequency="2 times/day"
      />

      <ReminderCard
        title={t('debug.longText')}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={false}
        expireDate={new Date('2025-3-12')}
        storage="25℃"
      />

      <ReminderCard
        title={'medicine name'}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={false}
        expireDate={new Date('2025-3-12')}
        storage="25℃"
      />
      <Button title="logout" onPress={logout} />
      <Button onPress={gotoDebugScreen} title="Debug" />
    </View>
  );
};
