import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../styles';
import { statusType } from '../../types';

interface Props {
  label?: string;
  type?: statusType;
  plain?: boolean;
  onPress?: () => void;
}

export default (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: commonStyles.statusColor[props.type ?? 'default'] },
        !props.plain && {
          backgroundColor: commonStyles.statusColor[props.type ?? 'default'],
        },
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.label,
          props.plain && {
            color: commonStyles.statusColor[props.type ?? 'default'],
          },
        ]}
      >
        {props.label ?? t('component.button.label')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: commonStyles.radius.medium,
    padding: commonStyles.spacings.small,
    margin: commonStyles.spacings.small,
  },
  label: {
    textAlign: 'center',
    color: commonStyles.color.white,
  },
});
