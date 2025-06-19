import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { ButtonSize, commonStyles } from '../../styles';
import { statusType } from '../../types';

import Button, { ButtonShapeType } from './Button';

export interface swipeActionProps {
  label?: string;
  type?: statusType;
  onPress?: (item: any) => void;
}

export interface swipeRowConfig {
  leftButton?: swipeActionProps[];
  rightButton?: swipeActionProps[];
  shape?: ButtonShapeType;
  size?: ButtonSize;
  plain?: boolean;
}

interface Props extends swipeRowConfig {
  children?: React.ReactNode;

  onPressItem?: (item: any) => void;
  onSwipeableOpen?: (instance: SwipeableMethods) => void;
  onSwipeableClose?: (instance: SwipeableMethods) => void;
}

const RenderButtons = (
  progress: SharedValue<number>,
  buttonProps: swipeActionProps[],
  { shape, size, plain, onPressItem }: Props,
  swipeableInstance: SwipeableMethods,
) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: Math.min(progress.value, 1) }],
  }));

  return (
    <Reanimated.View style={[styles.rightAction, animatedStyle]}>
      {buttonProps.map((bp, index) => (
        <Button
          {...bp}
          onPress={() => {
            bp.onPress?.(onPressItem);
            swipeableInstance?.close();
          }}
          shape={shape}
          size={size}
          plain={plain}
          key={index}
        />
      ))}
    </Reanimated.View>
  );
};

export default (props: Props) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  useEffect(() => {
    const swipeable = swipeableRef.current;
    return () => {
      if (swipeable && props.onSwipeableClose) {
        props.onSwipeableClose(swipeable);
      }
    };
  }, [props]);

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableClose={() => props.onSwipeableClose?.(swipeableRef.current!)}
      onSwipeableOpen={() => props.onSwipeableOpen?.(swipeableRef.current!)}
      friction={2}
      rightThreshold={40}
      renderRightActions={progress =>
        props.rightButton &&
        RenderButtons(progress, props.rightButton, props, swipeableRef.current!)
      }
      leftThreshold={40}
      renderLeftActions={progress =>
        props.leftButton &&
        RenderButtons(progress, props.leftButton, props, swipeableRef.current!)
      }
      animationOptions={{ useNativeDriver: true }}>
      <View>{props.children}</View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: commonStyles.spacings.small,
    justifyContent: 'center',
    paddingHorizontal: commonStyles.spacings.small,
  },
});
