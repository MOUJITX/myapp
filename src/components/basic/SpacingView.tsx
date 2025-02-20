import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

  const ScrollViewRef = useRef<ScrollView>(null);

  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    // console.log('isAtBottom', isAtBottom);
    setIsScrollEnd(isAtBottom);
  };

  const handleScrollSizeChange = () => {
    // console.log('handleScrollSizeChange');
    if (isScrollEnd) {
      ScrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return props.notScroll ? (
    <View style={[styles.container, styles.flex, props.style]}>
      {props.children}
    </View>
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
        onScroll={handleScroll}
        onContentSizeChange={handleScrollSizeChange}
        ref={ScrollViewRef}
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
    marginTop: commonStyles.spacings.smallX,
  },
  flex: { flex: 1 },
  bottom: { height: commonStyles.spacings.large2X },
  scrollViewKeyboardShow: { paddingBottom: 100 },
});
