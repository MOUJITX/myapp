import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useWelcomeHook } from './welcomeHook';

export const WelcomeScreen = () => {
  const {
    input: { isLogin },
    output: { gotoLoginScreen, gotoDefaultScreen },
  } = useWelcomeHook();
  // const WELCOME_TIMER = 3000;

  useEffect(() => {
    isLogin ? gotoDefaultScreen() : gotoLoginScreen();
    // const timer = setInterval(
    //   () => (isLogin ? gotoDefaultScreen() : gotoLoginScreen()),
    //   WELCOME_TIMER
    // );
    // return () => clearInterval(timer);
  });

  return (
    <View style={styles.container}>
      <Text>hello world</Text>
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
