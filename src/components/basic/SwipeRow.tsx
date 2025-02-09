import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonSize, commonStyles } from '../../styles';
import Button, { ButtonShapeType } from './Button';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { statusType } from '../../types';

interface ButtonActionProps {
  label?: string;
  type?: statusType;
  onPress?: () => void;
}

interface Props {
  leftButton?: ButtonActionProps[];
  rightButton?: ButtonActionProps[];
  shape?: ButtonShapeType;
  size?: ButtonSize;
  sizeX?: number;
  plain?: boolean;
  children?: React.ReactNode;
}

export default (props: Props) => {
  // 右侧滑动操作按钮（添加进度参数）
  const renderButtons = useCallback(
    (progress: SharedValue<number>, buttonProps: ButtonActionProps[]) => {
      const animatedStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
      }));

      return (
        <Reanimated.View style={[styles.rightAction, animatedStyle]}>
          {buttonProps.map((bp, index) => (
            <Button
              {...bp}
              shape={props.shape}
              size={props.size}
              sizeX={props.sizeX}
              plain={props.plain}
              key={index}
            />
          ))}
        </Reanimated.View>
      );
    },
    [props.plain, props.shape, props.size, props.sizeX]
  );

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={progress =>
        props.rightButton && renderButtons(progress, props.rightButton)
      }
      renderLeftActions={progress =>
        props.leftButton && renderButtons(progress, props.leftButton)
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
