import { StyleSheet, Text } from 'react-native';

import { commonStyles } from '../../styles';
import { statusType } from '../../types';

import { Props as CellProps } from './Cell';
import Cell from './Cell';

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
