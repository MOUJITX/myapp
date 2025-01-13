import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useWelcomeHook } from './welcomeHook';

export const WelcomeScreen = () => {
  const {
    input: { isLogin },
    output: { gotoPageA, gotoPageB },
  } = useWelcomeHook();

  useEffect(() => {
    // isLogin ? gotoPageA() : gotoPageB();
    gotoPageA();
    // const timer = setInterval(() => (isLogin ? goToPageA() : gotoPageB()), 0);
    // return () => clearInterval(timer);
  });

  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      <Button title="go to pageA" onPress={gotoPageA} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
