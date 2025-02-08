import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  children?: ReactNode;
  notScroll?: boolean;
}

export default (props: Props) => {
  return props.notScroll ? (
    <View style={styles.container}>{props.children}</View>
  ) : (
    <ScrollView style={styles.container}>{props.children}</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: commonStyles.spacings.medium,
    height: '100%',
  },
});
