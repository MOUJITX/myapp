import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { commonStyles } from '../../styles';

interface Props {
  children?: ReactNode;
  card?: boolean;
  style?: StyleProp<ViewStyle>;
  noSpacing?: boolean;
  header?: ReactNode;
  shadow?: boolean;
  title?: string;
  onPress?: () => void;
}

export default (props: Props) => {
  return (
    <View style={[props.noSpacing ? undefined : styles.groupSpace]}>
      {props.title && <Text style={styles.titleText}>{props.title}</Text>}
      <View
        style={[
          styles.cellGroup,
          props.card ? styles.card : undefined,
          props.shadow ? commonStyles.shadow : undefined,
          props.style,
        ]}
        onTouchEnd={props.onPress}>
        {props.header}
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: commonStyles.fontSize.large,
    paddingBottom: commonStyles.spacings.small2X,
    color: commonStyles.color.gray7,
    paddingHorizontal: commonStyles.spacings.medium,
  },
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
