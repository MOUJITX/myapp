import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../styles';

interface Props {
  onPress?: () => void;
  label: string;
}

export default (props: Props) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={props.onPress}>
      <Text style={styles.addButtonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: commonStyles.spacings.large2X,
    bottom: commonStyles.spacings.large3X,
    width: commonStyles.imageSize.large,
    height: commonStyles.imageSize.large,
    borderRadius: commonStyles.radius.circle,
    backgroundColor: commonStyles.color.blue,
    justifyContent: 'center',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  addButtonText: {
    fontSize: commonStyles.fontSize.large3X,
    color: commonStyles.color.white,
    fontWeight: 'bold',
  },
});
