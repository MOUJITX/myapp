import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Props as CellProps } from './Cell';
import Button, { ButtonShapeType } from '../../components/basic/Button';
import { SelectItem } from './SelectOptionList';
import Cell from './Cell';

interface Props extends CellProps {
  selectItems: SelectItem[];
  value?: string;
  onValueChange?: (value?: string) => void;
  onItemChange?: (item?: SelectItem) => void;
}

export default (props: Props) => {
  const handleButtonPress = (item: SelectItem) => {
    props.onValueChange && props.onValueChange(item.value);
    props.onItemChange && props.onItemChange(item);
  };

  return (
    <Cell {...props}>
      <View style={styles.optionButtons}>
        {props.selectItems.map((item, index) => (
          <Button
            shape={ButtonShapeType.NoRadius}
            type={props.value === item.value ? 'primary' : 'info'}
            label={item.label}
            onPress={() => handleButtonPress(item)}
            key={index}
          />
        ))}
      </View>
    </Cell>
  );
};

const styles = StyleSheet.create({
  optionButtons: {
    flexDirection: 'row',
  },
});
