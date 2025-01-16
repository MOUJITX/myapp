import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { commonStyles } from '../../screens/styles';

export interface Props {
  label?: string;
  inline?: boolean;
  required?: boolean;
  children?: ReactNode;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={props.inline ? styles.containerInline : undefined}>
        <View style={styles.label}>
          {props.label && <Text style={styles.labelText}>{props.label}</Text>}
          {props.required && <Text style={styles.required}>*</Text>}
        </View>
        <View style={props.inline ? undefined : styles.cellChildren}>
          {props.children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: commonStyles.color.gray3,
  },
  containerInline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    width: '30%',
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  required: {
    color: commonStyles.color.red,
  },
  labelText: {
    fontSize: commonStyles.fontSize.medium,
    color: commonStyles.color.gray8,
  },
  cellChildren: {
    paddingBottom: commonStyles.spacings.smallX,
  },
});
