import { t } from 'i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from '../../styles';

import Cell from './Cell';

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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  directIcon: {
    color: commonStyles.color.gray6,
    fontSize: commonStyles.fontSize.largeX,
    textAlign: 'right',
    width: commonStyles.spacings.large,
  },
  leftIcon: {
    width: commonStyles.spacings.large,
  },
  text: {
    color: commonStyles.textColor.default,
    flexShrink: 1,
    fontSize: commonStyles.fontSize.large,
    gap: 5,
  },
  textRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: commonStyles.spacings.smallX,
    justifyContent: 'flex-start',
  },
});
