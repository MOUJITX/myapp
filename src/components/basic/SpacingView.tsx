import React, { ReactNode, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { envInfo } from '../../utils/envInfo';

interface Props {
  children?: ReactNode;
  notScroll?: boolean;
  style?: StyleProp<ViewStyle>;
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
    <View style={[styles.container, props.style]}>{props.children}</View>
  ) : (
    <KeyboardAvoidingView
      behavior={envInfo.isIOS ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={[
          isKeyboardShow
            ? [styles.container, props.style, styles.scrollViewKeyboardShow]
            : undefined,
          styles.container,
          props.style,
        ]}
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
  },
  flex: {
    flex: 1,
  },
  bottom: {
    height: commonStyles.spacings.large,
  },
  scrollViewKeyboardShow: {
    paddingBottom: 100,
  },
});
