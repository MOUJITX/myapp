import React from 'react';
import { View, Button } from 'react-native';
import { usePage1Hook } from './page1Hook';
import ReminderCard from '../../components/expireReminder/ReminderCard';

export const PageA = () => {
  const {
    output: { logout, gotoDebugScreen },
  } = usePage1Hook();

  return (
    <View>
      <ReminderCard
        title={'medicine'}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={false}
        expireDate={new Date('2025-3-12')}
      />
      <ReminderCard
        title={'medicine'}
        img="https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128"
        isExpired={false}
        expireDate={new Date('2025-3-12')}
      />
      <Button title="logout" onPress={logout} />
      <Button onPress={gotoDebugScreen} title="Debug" />
    </View>
  );
};
