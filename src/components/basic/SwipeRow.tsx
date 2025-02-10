import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonSize, commonStyles } from '../../styles';
import Button, { ButtonShapeType } from './Button';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { statusType } from '../../types';

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
  onSwipeableOpen?: () => void;
  onSwipeableClose?: () => void;
}

const RenderButtons = (
  progress: SharedValue<number>,
  buttonProps: swipeActionProps[],
  { shape, size, plain, onPressItem }: Props
) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: Math.min(progress.value, 1) }],
    };
  });

  return (
    <Reanimated.View style={[styles.rightAction, animatedStyle]}>
      {buttonProps.map((bp, index) => (
        <Button
          {...bp}
          onPress={() => bp.onPress?.(onPressItem)}
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
        props.onSwipeableClose();
      }
    };
  }, [props]);

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableClose={props.onSwipeableClose}
      onSwipeableOpen={props.onSwipeableOpen}
      friction={2}
      rightThreshold={40}
      renderRightActions={progress =>
        props.rightButton && RenderButtons(progress, props.rightButton, props)
      }
      leftThreshold={40}
      renderLeftActions={progress =>
        props.leftButton && RenderButtons(progress, props.leftButton, props)
      }
      animationOptions={{ useNativeDriver: true }}
    >
      <View>{props.children}</View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: commonStyles.spacings.small,
    paddingHorizontal: commonStyles.spacings.small,
  },
});
