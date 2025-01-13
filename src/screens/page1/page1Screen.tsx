import React from 'react';
import { View, Text, Button } from 'react-native';
import { usePage1Hook } from './page1Hook';

export const PageA = () => {
  const {
    input: { isLogin, loginUser },
    output: { login, logout },
  } = usePage1Hook();

  return (
    <View>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Button title="login" onPress={login} />
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Button title="logout" onPress={logout} />
      <Text>isLogin: {isLogin ? 'true' : 'false'}</Text>
      <Text>loginUser: {loginUser ?? 'none'}</Text>
    </View>
  );
};
