import React, { ReactNode } from 'react';
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
        ]}
      >
        {props.label && (
          <View style={styles.label}>
            {props.label && (
              <Text
                style={[
                  styles.labelText,
                  props.labelSize && commonStyles.textSize[props.labelSize],
                ]}
              >
                {props.label}
              </Text>
            )}
            {props.required && <Text style={styles.required}>*</Text>}
          </View>
        )}
        <View
          style={[
            styles.cellChildren,
            props.inline && styles.cellChildrenInline,
          ]}
        >
          {props.left && props.left()}
          <View>{props.children}</View>
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
            ]}
          >
            {props.info}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  editContainer: {
    minHeight: 40,
  },
  editContainerInline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    width: '30%',
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  required: {
    color: commonStyles.color.red,
  },
  labelText: {
    fontSize: commonStyles.fontSize.medium,
    color: commonStyles.textColor.default,
  },
  cellChildren: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: commonStyles.spacings.smallX,
    width: '100%',
    borderWidth: 1,
  },
  cellChildrenInline: {
    justifyContent: 'flex-end',
  },
  infoText: {
    fontSize: commonStyles.fontSize.small,
  },
});
