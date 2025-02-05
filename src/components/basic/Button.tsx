import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ButtonSize, commonStyles } from '../../styles';
import { statusType } from '../../types';

interface Props {
  label?: string;
  type?: statusType;
  plain?: boolean;
  size?: ButtonSize;
  onPress?: () => void;
  shape?: 'default' | 'circle' | 'square';
  shadow?: boolean;
}

export default (props: Props) => {
  return (
    <TouchableOpacity style={[styles(props).container]} onPress={props.onPress}>
      <Text style={[styles(props).label]}>
        {props.label ?? t('component.button.label')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: commonStyles.statusColor[props.type ?? 'default'],
      backgroundColor: props.plain
        ? commonStyles.color.alpha0
        : commonStyles.statusColor[props.type ?? 'default'],
      // marginVertical: commonStyles.spacings.small,
      paddingHorizontal:
        props.shape === 'default' || !props.shape
          ? commonStyles.spacings.small
          : undefined,
      borderRadius:
        props.shape === 'circle'
          ? commonStyles.radius.circle
          : commonStyles.radius[props.size === 'small' ? 'small' : 'medium'],
      height: commonStyles.buttonSize[props.size ?? 'medium'],
      width:
        props.shape === 'circle' || props.shape === 'square'
          ? commonStyles.buttonSize[props.size ?? 'medium']
          : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      ...(props.shadow ? commonStyles.shadow : {}),
    },
    label: {
      textAlign: 'center',
      color: props.plain
        ? commonStyles.statusColor[props.type ?? 'default']
        : commonStyles.color.white,
      fontSize:
        commonStyles.fontSize[props.size === 'large' ? 'largeX' : 'medium'],
    },
  });
