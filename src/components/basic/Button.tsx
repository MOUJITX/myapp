import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ButtonSize, commonStyles } from '../../styles';
import { statusType } from '../../types';

export enum ButtonShapeType {
  Default = 'default',
  Circle = 'circle',
  Square = 'square',
  NoRadius = 'noRadius',
}

export interface Props {
  label?: string;
  type?: statusType;
  plain?: boolean;
  size?: ButtonSize;
  sizeX?: number;
  onPress?: () => void;
  shape?: ButtonShapeType;
  shadow?: boolean;
}

export default (props: Props) => {
  return (
    <TouchableOpacity style={styles(props).container} onPress={props.onPress}>
      <Text style={styles(props).label}>
        {props.label ?? t('component.button.label')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: props.plain
        ? commonStyles.color.alpha0
        : commonStyles.statusColor[props.type ?? 'default'],
      borderColor: commonStyles.statusColor[props.type ?? 'default'],
      borderRadius:
        props.shape === 'noRadius'
          ? 0
          : props.shape === 'circle'
            ? commonStyles.radius.circle
            : commonStyles.radius[props.size === 'small' ? 'small' : 'medium'],
      borderWidth: 1,
      height:
        commonStyles.buttonSize[props.size ?? 'medium'] * (props.sizeX ?? 1),
      justifyContent: 'center',
      paddingHorizontal:
        props.shape === 'default' || props.shape === 'noRadius' || !props.shape
          ? commonStyles.spacings.small
          : undefined,
      width:
        props.shape === 'circle' || props.shape === 'square'
          ? commonStyles.buttonSize[props.size ?? 'medium'] * (props.sizeX ?? 1)
          : undefined,
      ...(props.shadow ? commonStyles.shadow : {}),
    },
    label: {
      color: props.plain
        ? commonStyles.statusColor[props.type ?? 'default']
        : commonStyles.color.white,
      fontSize:
        commonStyles.fontSize[props.size === 'large' ? 'largeX' : 'medium'],
      textAlign: 'center',
    },
  });
