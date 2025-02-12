import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Cell from './Cell';
import { commonStyles } from '../../styles';

interface Props {
  label: string;
  icon?: string;
  onPress?: () => void;
}

export default (props: Props) => {
  return (
    <Cell>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.buttonRow}>
          <View style={styles.textRow}>
            {props.icon && <Text style={styles.text}>{props.icon}</Text>}
            <Text style={styles.text}>{props.label}</Text>
          </View>
          <Text style={styles.directIcon}>{'>'}</Text>
        </View>
      </TouchableOpacity>
    </Cell>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: commonStyles.spacings.small2X,
  },
  textRow: {
    gap: commonStyles.spacings.smallX,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 1,
  },
  text: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.large,
    flexShrink: 1,
  },
  directIcon: {
    color: commonStyles.color.gray6,
    fontSize: commonStyles.fontSize.largeX,
    marginLeft: commonStyles.spacings.medium,
  },
});
