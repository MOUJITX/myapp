import React from 'react';
import { Props as CellProps } from './Cell';
import { Switch } from 'react-native';
import Cell from './Cell';

interface Props extends CellProps {
  value?: boolean;
  onValueChange: (value: boolean) => void;
}

export default (props: Props) => {
  return (
    <Cell {...props}>
      <Switch value={props.value} onValueChange={props.onValueChange} />
    </Cell>
  );
};
