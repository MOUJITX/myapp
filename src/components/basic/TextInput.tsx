import React, { ReactNode } from 'react';
import { Props as CellProps } from './Cell';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Cell from './Cell';
import { t } from 'i18next';
import { commonStyles } from '../../styles';

interface Props extends CellProps, TextInputProps {
  value?: string;
  textLines?: number;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  onValueChange: (value: string) => void;
  left?: () => ReactNode;
  right?: () => ReactNode;
}

export default (props: Props) => {
  const handleTextInput = (value: string) => {
    let newValue = value;

    if (props.type === 'number') {
      newValue = value.replace(/[^0-9]/g, '');
    }

    props.onValueChange(newValue);
  };

  return (
    <Cell {...props}>
      <View style={styles.inputRow}>
        {props.left && props.left()}
        <TextInput
          style={styles.textInput}
          multiline={!!props.textLines && props.textLines > 1}
          numberOfLines={props.textLines}
          placeholder={
            props.placeholder ?? t('component.textInput.placeholder')
          }
          value={props.value}
          onChangeText={handleTextInput}
          keyboardType={props.type === 'number' ? 'numeric' : 'default'}
          secureTextEntry={props.type === 'password'}
          {...props}
        />
        {props.right && props.right()}
      </View>
    </Cell>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 0,
    margin: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: commonStyles.spacings.smallX,
  },
});
