import { t } from 'i18next';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { commonStyles, TextSize } from '../../styles';
import { statusType } from '../../types';

import Divider from './Divider';

export interface Props {
  label?: string;
  labelSize?: TextSize;
  inline?: boolean;
  required?: boolean;
  children?: ReactNode;
  info?: string;
  infoType?: statusType;
  left?: () => ReactNode;
  right?: () => ReactNode;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.editContainer,
          props.inline && styles.editContainerInline,
        ]}>
        {props.label && (
          <View style={[styles.label, !props.inline && styles.labelFullWidth]}>
            {props.label && (
              <Text
                style={[
                  styles.labelText,
                  props.labelSize && commonStyles.textSize[props.labelSize],
                ]}>
                {props.label}
              </Text>
            )}
            {props.required && (
              <Text style={styles.required}>{t('common.required.icon')}</Text>
            )}
          </View>
        )}
        <View
          style={[
            styles.cellEdit,
            props.inline && styles.cellEditInline,
            !props.label && styles.cellEditNoLabel,
          ]}>
          {props.left && props.left()}
          <View
            style={[
              styles.cellChildren,
              !props.inline && styles.cellChildrenInline,
            ]}>
            {props.children}
          </View>
          {props.right && props.right()}
        </View>
      </View>
      {props.info !== undefined && (
        <>
          <Divider />
          <Text
            style={[
              styles.infoText,
              { color: commonStyles.textColor[props.infoType ?? 'info'] },
            ]}>
            {props.info}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cellChildren: {
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  cellChildrenInline: {
    flex: 1,
  },
  cellEdit: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: commonStyles.spacings.smallX,
    width: '100%',
  },
  cellEditInline: {
    justifyContent: 'flex-end',
  },
  cellEditNoLabel: {
    minHeight: 40,
  },
  container: {
    width: '100%',
  },
  editContainer: {
    // minHeight: 40,
  },
  editContainerInline: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: commonStyles.fontSize.small,
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    minHeight: 40,
    width: '30%',
  },
  labelFullWidth: {
    width: '100%',
  },
  labelText: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.medium,
  },
  required: {
    color: commonStyles.color.red,
  },
});
