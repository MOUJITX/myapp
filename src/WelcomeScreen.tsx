import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AppNavigationList} from './navigation/AppNavigationList';

export const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AppNavigationList>>();

  const goToPageA = () => navigation.replace('PageA');

  const gotoPageB = () => navigation.replace('PageB');

  useEffect(() => {
    const isLogin = true;
    const timer = setInterval(() => (isLogin ? goToPageA() : gotoPageB()), 0);
    return () => clearInterval(timer);
  });

  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      <Button title="go to pageA" onPress={goToPageA} />
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
