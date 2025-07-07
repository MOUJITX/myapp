import { t } from 'i18next';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ButtonSize, commonStyles } from '../../styles';
import { statusType } from '../../types';

import Popup from './Popup';

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
  text?: boolean;
  size?: ButtonSize;
  sizeX?: number;
  onPress?: () => void;
  shape?: ButtonShapeType;
  shadow?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  pressConfirm?: { title?: string; description: string };
}

export default (props: Props) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const handleButtonPress = () => {
    if (props.pressConfirm) {
      setShowConfirmDialog(true);
      return;
    }

    props.onPress && props.onPress();
  };

  return (
    <>
      <TouchableOpacity
        style={styles(props).container}
        onPress={handleButtonPress}>
        <View style={styles(props).labelContainer}>
          {props.leftIcon && (
            <Text style={styles(props).label}>{props.leftIcon}</Text>
          )}
          <Text style={styles(props).label}>
            {props.label ?? t('component.button.label')}
          </Text>
          {props.rightIcon && (
            <Text style={styles(props).label}>{props.rightIcon}</Text>
          )}
        </View>
      </TouchableOpacity>

      {props.pressConfirm && (
        <Popup
          visible={showConfirmDialog}
          title={props.pressConfirm.title}
          content={props.pressConfirm.description}
          buttonsInline
          buttons={[
            {
              label: t('common.cancel.label'),
              onPress: () => setShowConfirmDialog(false),
              type: 'default',
            },
            {
              label: t('common.confirm.label'),
              onPress: () => {
                props.onPress && props.onPress();
                setShowConfirmDialog(false);
              },
              type: 'danger',
            },
          ]}
        />
      )}
    </>
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
          ? commonStyles.spacings.small
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
        commonStyles.fontSize[props.size === 'large' ? 'largeX' : 'medium'],
    },
    labelContainer: {
      flexDirection: 'row',
      gap: commonStyles.spacings.smallX,
      textAlign: 'center',
    },
  });
