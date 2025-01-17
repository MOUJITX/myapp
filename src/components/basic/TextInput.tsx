import React, { useState } from 'react';
import { Props as CellProps } from './Cell';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import Cell from './Cell';
import { t } from 'i18next';

interface Props extends CellProps, TextInputProps {
  value?: string;
  textLines?: number;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  onValueChange: (value: string) => void;
}

export default (props: Props) => {
  const [textValue, setTextValue] = useState(props.value);

  const handleTextInput = (value: string) => {
    if (props.type === 'number') {
      const numberFormat = value.replace(/[^0-9]/g, '');
      setTextValue(numberFormat);
    }

    props.onValueChange(value);
  };

  return (
    <Cell {...props}>
      <TextInput
        style={styles.textInput}
        multiline={!!props.textLines && props.textLines > 1}
        numberOfLines={props.textLines}
        placeholder={props.placeholder ?? t('component.textInput.placeholder')}
        value={textValue}
        onChangeText={handleTextInput}
        keyboardType={props.type === 'number' ? 'numeric' : 'default'}
        secureTextEntry={props.type === 'password'}
        {...props}
      />
    </Cell>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    margin: 0,
  },
});
