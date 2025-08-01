import { StyleSheet, Text, View } from 'react-native';

import { ButtonSize, commonStyles } from '../../styles';
import { statusType } from '../../types';

export enum TagShapeType {
  Default = 'default',
  Circle = 'circle',
  Square = 'square',
  NoRadius = 'noRadius',
}

export interface Props {
  label?: string;
  type?: statusType;
  plain?: boolean;
  text?: boolean;
  size?: ButtonSize;
  sizeX?: number;
  shape?: TagShapeType;
  shadow?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

export default (props: Props) => {
  return (
    <View style={styles(props).container}>
      <View style={styles(props).labelContainer}>
        {props.leftIcon && (
          <Text style={styles(props).label}>{props.leftIcon}</Text>
        )}
        <Text style={styles(props).label}>{props.label}</Text>
        {props.rightIcon && (
          <Text style={styles(props).label}>{props.rightIcon}</Text>
        )}
      </View>
    </View>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor:
        props.plain || props.text
          ? commonStyles.color.alpha0
          : commonStyles.statusColor[props.type ?? 'default'],
      borderColor: commonStyles.statusColor[props.type ?? 'default'],
      borderRadius:
        props.shape === 'noRadius' || props.text
          ? 0
          : props.shape === 'circle'
            ? commonStyles.radius.circle
            : commonStyles.radius[props.size === 'small' ? 'small' : 'medium'],
      borderWidth: props.text ? 0 : 1,
      height:
        commonStyles.buttonSize[props.size ?? 'medium'] * (props.sizeX ?? 1),
      justifyContent: 'center',
      paddingHorizontal:
        props.shape === 'default' || props.shape === 'noRadius' || !props.shape
          ? commonStyles.spacings.smallX * (props.sizeX ?? 1)
          : undefined,
      width:
        props.shape === 'circle' || props.shape === 'square'
          ? commonStyles.buttonSize[props.size ?? 'medium'] * (props.sizeX ?? 1)
          : undefined,
      ...(props.shadow ? commonStyles.shadow : {}),
    },
    label: {
      color:
        props.plain || props.text
          ? commonStyles.statusColor[props.type ?? 'default']
          : commonStyles.color.white,
      fontSize:
        commonStyles.fontSize[props.size === 'large' ? 'largeX' : 'medium'] *
        (props.sizeX ?? 1),
    },
    labelContainer: {
      flexDirection: 'row',
      gap: commonStyles.spacings.small2X,
      textAlign: 'center',
    },
  });
