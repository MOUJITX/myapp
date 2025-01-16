import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../screens/styles';

interface Props {
  children?: ReactNode;
  card?: boolean;
}

export default (props: Props) => {
  return (
    <View style={[styles.cellGroup, props.card ? styles.card : undefined]}>
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
  card: {
    borderRadius: 10,
    margin: commonStyles.spacings.small,
  },
});
