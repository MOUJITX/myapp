import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Cell from './Cell';
import { commonStyles } from '../../styles';
import { t } from 'i18next';

interface Props {
  label: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  onRightPress?: () => void;
  onLongPress?: () => void;
}

export default (props: Props) => {
  return (
    <Cell>
      <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={styles.buttonRow}>
          <View style={styles.textRow}>
            {props.leftIcon && (
              <Text style={[styles.text, styles.leftIcon]}>
                {props.leftIcon}
              </Text>
            )}
            <Text style={styles.text}>{props.label}</Text>
          </View>
          <Text style={styles.directIcon} onPress={props.onRightPress}>
            {props.rightIcon ?? t('common.goto.icon')}
          </Text>
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
    width: '100%',
  },
  textRow: {
    gap: commonStyles.spacings.smallX,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 1,
  },
  leftIcon: {
    width: commonStyles.spacings.large,
  },
  text: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.large,
    flexShrink: 1,
    gap: 5,
  },
  directIcon: {
    color: commonStyles.color.gray6,
    fontSize: commonStyles.fontSize.largeX,
    width: commonStyles.spacings.large,
    textAlign: 'right',
  },
});
