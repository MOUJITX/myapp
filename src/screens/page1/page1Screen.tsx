import React from 'react';
import { View, Button } from 'react-native';
import { usePage1Hook } from './page1Hook';

export const PageA = () => {
  const {
    output: { logout, gotoDebugScreen },
  } = usePage1Hook();

  return (
    <View>
      <Button title="logout" onPress={logout} />
      <Button onPress={gotoDebugScreen} title="Debug" />
    </View>
  );
};
