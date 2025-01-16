import React from 'react';
import { Props as CellProps } from './Cell';
import { Text } from 'react-native';
import Cell from './Cell';

interface Props extends CellProps {
  value?: string;
}

export default (props: Props) => {
  return (
    <Cell {...props}>
      <Text>{props.value}</Text>
    </Cell>
  );
};
