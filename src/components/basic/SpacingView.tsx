import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';

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
