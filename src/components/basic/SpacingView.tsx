import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';

import { commonStyles } from '../../styles';
import { envInfo } from '../../utils/envInfo';

interface Props {
  children?: ReactNode;
  notScroll?: boolean;
  notAutoEnd?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface SpacingViewRef {
  scrollTo: (position: number) => void;
}

const SpacingView: ForwardRefRenderFunction<SpacingViewRef, Props> = (
  props,
  ref,
) => {
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
    if (isScrollEnd && !props.notAutoEnd) {
      ScrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleScrollTo = (position: number) => {
    ScrollViewRef.current?.scrollTo({ y: position, animated: true });
  };

  useImperativeHandle(
    ref,
    (): SpacingViewRef => ({
      scrollTo: handleScrollTo,
    }),
  );

  return props.notScroll ? (
    <View style={[styles.container, styles.flex, props.style]}>
      {props.children}
    </View>
  ) : (
    <KeyboardAvoidingView
      behavior={envInfo.isIOS ? 'padding' : 'height'}
      style={styles.flex}>
      <ScrollView
        contentContainerStyle={[
          isKeyboardShow ? [styles.scrollViewKeyboardShow] : undefined,
          styles.container,
          props.style,
        ]}
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        onContentSizeChange={handleScrollSizeChange}
        ref={ScrollViewRef}>
        {props.children}
        <View style={styles.bottom} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bottom: { height: commonStyles.spacings.large2X },
  container: {
    marginTop: commonStyles.spacings.smallX,
    paddingHorizontal: commonStyles.spacings.medium,
  },
  flex: { flex: 1 },
  scrollViewKeyboardShow: { paddingBottom: commonStyles.spacings.large4X },
});

export default forwardRef<SpacingViewRef, Props>(SpacingView);
