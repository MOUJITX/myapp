import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles';

interface Props {
  children?: ReactNode;
}

export default (props: Props) => {
  return <ScrollView style={styles.container}>{props.children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: commonStyles.spacings.medium,
  },
});
