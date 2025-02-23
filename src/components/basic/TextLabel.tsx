import React from 'react';
import { Props as CellProps } from './Cell';
import { StyleSheet, Text } from 'react-native';
import Cell from './Cell';
import { statusType } from '../../types';
import { commonStyles } from '../../styles';

export interface Props extends CellProps {
  value?: string;
  textColor?: statusType;
  onTextPress?: () => void;
}

export default (props: Props) => {
  return (
    <Cell {...props}>
      <Text style={styles(props).text} onPress={props.onTextPress}>
        {props.value}
      </Text>
    </Cell>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    text: {
      color: commonStyles.textColor[props.textColor ?? 'default'],
      // paddingBottom: commonStyles.spacings.smallX,
    },
  });
