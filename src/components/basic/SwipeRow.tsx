import React from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import Button from './Button';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Props {
  onDelete?: () => void;
}

export default (props: Props) => {
  // 右侧滑动操作按钮
  const renderRightButtons = () => (
    <View style={styles.rightAction}>
      <Button
        type="warning"
        shape="circle"
        size="medium"
        onPress={props.onDelete}
        label="Right 1"
      />
      <Button
        type="danger"
        shape="circle"
        size="medium"
        onPress={props.onDelete}
        label="Right 2"
      />
    </View>
  );

  const renderLeftButtons = () => (
    <View style={styles.rightAction}>
      <Button
        type="success"
        shape="circle"
        size="medium"
        onPress={props.onDelete}
        label="Left"
      />
    </View>
  );

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightButtons}
      renderLeftActions={renderLeftButtons}
    >
      <View style={styles.container}>{/* 这里放主要内容 */}</View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.color.gray5,
    height: 100,
    justifyContent: 'center',
    padding: 16,
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: commonStyles.spacings.small,
    paddingHorizontal: commonStyles.spacings.small,
  },
});
