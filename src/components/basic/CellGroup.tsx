import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { commonStyles } from '../../styles';

interface Props {
  children?: ReactNode;
  card?: boolean;
  style?: StyleProp<ViewStyle>;
  noSpacing?: boolean;
  header?: ReactNode;
  shadow?: boolean;
  onPress?: () => void;
}

export default (props: Props) => {
  return (
    <View
      style={[
        styles.cellGroup,
        props.card ? styles.card : undefined,
        props.noSpacing ? undefined : styles.groupSpace,
        props.style,
        props.shadow ? commonStyles.shadow : undefined,
      ]}
      onTouchEnd={props.onPress}
    >
      {props.header}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  cellGroup: {
    backgroundColor: commonStyles.color.white,
    paddingHorizontal: commonStyles.spacings.medium,
    paddingVertical: commonStyles.spacings.small,
  },
  groupSpace: {
    marginVertical: commonStyles.spacings.smallX,
  },
  card: {
    borderRadius: commonStyles.radius.medium,
  },
});
