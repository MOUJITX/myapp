import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { envInfo } from '../../utils/envInfo';

interface Props {
  children?: ReactNode;
  notScroll?: boolean;
}

export default (props: Props) => {
  const [isKeyboardShow, SetIsKeyboardShow] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      SetIsKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      SetIsKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return props.notScroll ? (
    <View style={styles.container}>{props.children}</View>
  ) : (
    <KeyboardAvoidingView
      behavior={envInfo.isIOS ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          isKeyboardShow ? styles.scrollViewKeyboardShow : undefined
        }
        keyboardShouldPersistTaps="handled"
      >
        {props.children}
        <View style={styles.bottom} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: commonStyles.spacings.medium,
    flex: 1,
  },
  bottom: {
    height: commonStyles.spacings.large,
  },
  scrollViewKeyboardShow: {
    paddingBottom: 100,
  },
});
