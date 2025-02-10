import React, { useEffect, useState } from 'react';
import { Props as CellProps } from './Cell';
import { StyleSheet, TextInput, View } from 'react-native';
import Cell from './Cell';
import Button, { ButtonShapeType } from './Button';
import { commonStyles } from '../../styles';

interface Props extends CellProps {
  value?: number;
  placeholder?: string;
  step?: number;
  min?: number;
  max?: number;
  quickValues?: { value: number; label: string }[];
  onValueChange: (value?: number) => void;
}

export default (props: Props) => {
  const [numberValue, setNumberValue] = useState<number>(props.value ?? 0);

  useEffect(() => {
    // console.log(props.value);
    setNumberValue(props.value ?? 0);
  }, [props.value]);

  const setNumberValueToPropValue = (value: number) => {
    setNumberValue(value);
    props.onValueChange(value);
  };

  const handleNumberInput = (value: string) => {
    const numberFormat = Number(value.replace(/[^0-9]/g, ''));
    setNumberValueToPropValue(numberFormat);
  };

  const handleNumberChange = (value: number) => {
    let newValue = numberValue + value;
    if (props.min !== undefined && newValue < props.min) {
      newValue = props.min;
    }
    if (props.max !== undefined && newValue > props.max) {
      newValue = props.max;
    }

    setNumberValueToPropValue(newValue);
  };

  return (
    <Cell {...props}>
      <View style={styles.container}>
        <Button
          label="-"
          plain
          type="primary"
          onPress={() => handleNumberChange(-(props.step ?? 1))}
          size="small"
          shape={ButtonShapeType.Square}
        />
        <TextInput
          style={styles.textInput}
          value={numberValue.toString()}
          onChangeText={handleNumberInput}
          keyboardType={'numeric'}
        />
        <Button
          label="+"
          plain
          type="primary"
          onPress={() => handleNumberChange(props.step ?? 1)}
          size="small"
          shape={ButtonShapeType.Square}
        />
      </View>
      {props.quickValues && (
        <View style={styles.quickValue}>
          {props.quickValues.map((quickValue, index) => (
            <Button
              label={quickValue.label}
              plain={quickValue.value !== numberValue}
              type="primary"
              onPress={() => handleNumberInput(quickValue.value.toString())}
              size="small"
              key={index}
            />
          ))}
        </View>
      )}
    </Cell>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    marginHorizontal: commonStyles.spacings.smallX,
    minWidth: 25,
    textAlign: 'center',
  },
  quickValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: commonStyles.spacings.smallX,
  },
});
