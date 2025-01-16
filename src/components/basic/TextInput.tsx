import React from 'react';
import { Props as CellProps } from './Cell';
import { StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import Cell from './Cell';

interface Props extends CellProps {
  value?: string;
  textLines?: number;
  placeholder?: string;
  onValueChange: (value: string) => void;
}

export default (props: Props) => {
  const { t } = useTranslation();
  return (
    <Cell {...props}>
      <TextInput
        style={styles.textInput}
        multiline={!!props.textLines && props.textLines > 1}
        numberOfLines={props.textLines}
        placeholder={props.placeholder ?? t('component.textInput.placeholder')}
        value={props.value}
        onChangeText={props.onValueChange}
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
